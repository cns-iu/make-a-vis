import { Injectable, OnDestroy } from '@angular/core';
import { from, Observable, ReplaySubject } from 'rxjs';
import { pluck, switchAll } from 'rxjs/operators';
import { View } from 'vega';
import embed, { Result } from 'vega-embed';


const EMPTY_EMBED_RESULT = Promise.resolve({
  finalize: () => undefined
} as unknown as Result);

@Injectable()
export class VegaManagerService implements OnDestroy {
  get view$(): Observable<View> {
    return this.result$.pipe(
      switchAll(),
      pluck('view')
    );
  }

  private result = EMPTY_EMBED_RESULT;
  private result$ = new ReplaySubject<Observable<Result>>(1);

  ngOnDestroy(): void {
    this.result.then(result => result.finalize());
    this.result$.complete();
  }

  create(...args: Parameters<typeof embed>): Promise<Result> {
    const previous = this.result;
    const current = embed(...args);
    const obs = from(current);

    this.result = current;
    this.result$.next(obs);

    // Clean up previous instance
    current.then(() => previous).then(result => result.finalize());

    return current;
  }
}
