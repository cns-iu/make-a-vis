import { Injectable, NgZone, OnDestroy, Type } from '@angular/core';
import { keyBy } from 'lodash';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, mergeAll, takeUntil, withLatestFrom } from 'rxjs/operators';

/** A object providing data */
export interface DataLinkSource<T> {
  /** The identifier of this data source */
  id: string;
  /** The data observable */
  data$: Observable<T>;
  /** An observable emitting when id or data changes */
  change$: Observable<any>;
}

/** An object consuming data */
export interface DataLinkTarget<T> {
  /** The souce to connect to */
  source: string;
  /** An observable emitting when source changes */
  change$: Observable<any>;
  /** Function to call to connect to the data source */
  connect(data$: Observable<T>): void;
}

/** Base class with common functionality for managers */
class DataLinkManagerBase {
  /** The observable emitting when something changes */
  change$: Observable<any>;
  /** Subject used to close the change observable */
  private complete$ = new Subject<any>();

  /**
   * Creates an instance of data link manager base.
   * @param object The object
   */
  constructor(object: { change$: Observable<any> }) {
    this.change$ = object.change$.pipe(takeUntil(this.complete$));
  }

  /** Closes the change observable */
  destroy(): void {
    this.complete$.next(undefined);
    this.complete$.complete();
  }
}

/** A manager for a data source */
class DataLinkSourceManager<T> extends DataLinkManagerBase {
  /** The same as the original object's id */
  get id(): string { return this.source.id; }
  /** The same as the original object's data$  */
  get data$(): Observable<T> { return this.source.data$; }

  /**
   * Creates an instance of data link source manager.
   * @param source The source object
   */
  constructor(readonly source: DataLinkSource<T>) { super(source); }
}

/** A manager for a data target */
class DataLinkTargetManager<T> extends DataLinkManagerBase {
  /** The same as the original object's source */
  get source(): string { return this.target.source; }

  /**
   * Creates an instance of data link target manager.
   * @param target The target object
   */
  constructor(readonly target: DataLinkTarget<T>) { super(target); }

  /**
   * Calls the original objext's connect method
   * @param data$ The data to connect to
   */
  connect(data$: Observable<T>): void { this.target.connect(data$); }
}

/**
 * Service for connecting objects to their data sources
 */
@Injectable({
  providedIn: 'root'
})
export class DataLinkService implements OnDestroy {
  /** A map from objects to their manager */
  private sources = new Map<DataLinkSource<any>, DataLinkSourceManager<any>>();
  /** A map from objects to their manager */
  private targets = new Map<DataLinkTarget<any>, DataLinkTargetManager<any>>();

  /** The subject to which changes are sent */
  private change$ = new Subject<Observable<any>>();
  /** The update subscription */
  private relinkSubscription: Subscription;

  /**
   * Creates an instance of data link service.
   * @param zone The angular zone
   */
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

  /**
   * Angular's on destroy hook
   * Cleans up subscriptions
   */
  ngOnDestroy() {
    this.relinkSubscription.unsubscribe();
  }

  /**
   * Registers a source object
   * @param source The object
   */
  registerSource<T>(source: DataLinkSource<T>): void {
    this.register(source, this.sources, DataLinkSourceManager);
  }

  /**
   * Unregisters a source object
   * @param source The object
   */
  unregisterSource<T>(source: DataLinkSource<T>): void {
    this.unregister(source, this.sources);
  }

  /**
   * Registers a target object
   * @param target The object
   */
  registerTarget<T>(target: DataLinkTarget<T>): void {
    this.register(target, this.targets, DataLinkTargetManager);
  }

  /**
   * Unregisters a target object
   * @param target The object
   */
  unregisterTarget<T>(target: DataLinkTarget<T>): void {
    this.unregister(target, this.targets);
  }

  /**
   * Registers a source/target
   * @param object The source/target object
   * @param group The mapping to put it in
   * @param managerType The constructor of a manager
   */
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

  /**
   * Unregisters a source/target
   * @param object The source/target object
   * @param group The map in the object exists
   */
  private unregister<T>(object: T, group: Map<T, DataLinkManagerBase>): void {
    const manager = group.get(object);
    group.delete(object);
    if (manager) { manager.destroy(); }
  }

  /**
   * Updates the linking between sources and targets
   */
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
