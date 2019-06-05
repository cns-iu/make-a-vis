import { Injectable, NgZone, OnDestroy, Type } from '@angular/core';
import { keyBy } from 'lodash';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, mergeAll, takeUntil, withLatestFrom } from 'rxjs/operators';

export interface DataLinkSource<T> {
  id: string;
  data$: Observable<T>;
  change$: Observable<any>;
}

export interface DataLinkTarget<T> {
  source: string;
  change$: Observable<any>;
  connect(data$: Observable<T>): void;
}

class DataLinkManagerBase {
  change$: Observable<any>;
  private complete$ = new Subject<any>();

  constructor(object: { change$: Observable<any> }) {
    this.change$ = object.change$.pipe(takeUntil(this.complete$));
  }

  destroy(): void {
    this.complete$.next(undefined);
    this.complete$.complete();
  }
}

class DataLinkSourceManager<T> extends DataLinkManagerBase {
  get id(): string { return this.source.id; }
  get data$(): Observable<T> { return this.source.data$; }

  constructor(readonly source: DataLinkSource<T>) { super(source); }
}

class DataLinkTargetManager<T> extends DataLinkManagerBase {
  get source(): string { return this.target.source; }

  constructor(readonly target: DataLinkTarget<T>) { super(target); }

  connect(data$: Observable<T>): void { this.target.connect(data$); }
}

@Injectable({
  providedIn: 'root'
})
export class DataLinkService implements OnDestroy {
  private sources = new Map<DataLinkSource<any>, DataLinkSourceManager<any>>();
  private targets = new Map<DataLinkTarget<any>, DataLinkTargetManager<any>>();

  private change$ = new Subject<Observable<any>>();
  private relinkSubscription: Subscription;

  constructor(private zone: NgZone) {
    let lastChange = -1;
    this.relinkSubscription = zone.onMicrotaskEmpty.pipe(
      withLatestFrom(this.change$.pipe(
        mergeAll(),
        map((_unused, index) => index)
      )),
      filter(([_unused, index]) => {
        if (lastChange >= index) { return false; }
        lastChange = index;
        return true;
      })
    ).subscribe(() => this.relink());
  }

  ngOnDestroy() {
    this.relinkSubscription.unsubscribe();
  }

  registerSource<T>(source: DataLinkSource<T>): void {
    this.register(source, this.sources, DataLinkSourceManager);
  }

  unregisterSource<T>(source: DataLinkSource<T>): void {
    this.unregister(source, this.sources);
  }

  registerTarget<T>(target: DataLinkTarget<T>): void {
    this.register(target, this.targets, DataLinkTargetManager);
  }

  unregisterTarget<T>(target: DataLinkTarget<T>): void {
    this.unregister(target, this.targets);
  }

  private register<T>(
    object: T, group: Map<T, DataLinkManagerBase>,
    managerType: Type<DataLinkManagerBase>
  ): void {
    if (!group.has(object)) {
      const manager = new managerType(object);
      group.set(object, manager);
      this.change$.next(manager.change$);
    }
  }

  private unregister<T>(object: T, group: Map<T, DataLinkManagerBase>): void {
    const manager = group.get(object);
    group.delete(object);
    if (manager) { manager.destroy(); }
  }

  private relink(): void {
    const sources = Array.from(this.sources.keys());
    const sourcesById = keyBy(sources, 'id');
    const targets = Array.from(this.targets.keys());
    const notFound: string[] = [];

    for (const target of targets) {
      const id = target.source;
      const source = sourcesById[id];
      if (source) {
        target.connect(source.data$);
      } else if (id) {
        notFound.push(id);
      }
    }

    if (notFound.length) {
      const error = new Error(`Projects not found for '${notFound.join('\', \'')}'`);
      this.zone.onError.emit(error);
    }
  }
}
