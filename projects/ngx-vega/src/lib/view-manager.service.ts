import { Injectable, OnDestroy } from '@angular/core';
import { from, Observable, ReplaySubject, Subscription } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, pluck, shareReplay, startWith, switchAll } from 'rxjs/operators';
import { View } from 'vega';
import embed from 'vega-embed';


export interface ViewLoading {
  type: 'loading';
  loader: Promise<View>;
}

export interface ViewReady {
  type: 'ready';
  view: View;
}

export interface ViewError {
  type: 'error';
  error: unknown;
}

export type ViewEvent = ViewLoading | ViewReady | ViewError;


@Injectable()
export class ViewManagerService implements OnDestroy {
  private readonly loader$ = new ReplaySubject<Observable<ViewEvent>>(1);
  private subscriptions = new Subscription();

  readonly event$ = this.loader$.pipe(
    switchAll(),
    shareReplay(1)
  );

  readonly view$ = this.event$.pipe(
    filter((event): event is ViewReady => event.type === 'ready'),
    pluck('view')
  );

  readonly loading$ = this.event$.pipe(
    map(event => event.type === 'loading'),
    distinctUntilChanged(),
  );

  readonly error$ = this.event$.pipe(
    filter((event): event is ViewError => event.type === 'error'),
    pluck('error')
  );

  ngOnDestroy(): void {
    this.loader$.complete();
    this.subscriptions.unsubscribe();
  }

  create(...args: Parameters<typeof embed>): void {
    const loader = embed(...args);
    const subscriptions = this.subscriptions;
    const teardown = () => loader.then(result => result.finalize());
    const subscription = new Subscription(teardown);
    const viewLoader = loader.then(result => result.view);
    const observable = from(viewLoader).pipe(
      map(view => ({ type: 'ready', view: view } as ViewReady)),
      catchError(error => from([{ type: 'error', error } as ViewError])),
      startWith({ type: 'loading', loader: viewLoader } as ViewLoading)
    );

    subscription.add(subscriptions);
    loader.finally(() => subscriptions.unsubscribe());
    this.subscriptions = subscription;
    this.loader$.next(observable);
  }
}
