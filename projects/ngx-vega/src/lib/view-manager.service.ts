import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { View } from 'vega';
import embed, { Result } from 'vega-embed';


@Injectable()
export class ViewManagerService implements OnDestroy {
  private readonly instances: Promise<Result>[] = [];
  private readonly _view$ = new ReplaySubject<View>(1);

  readonly view$ = this._view$.asObservable();

  ngOnDestroy(): void {
    const { instances, _view$ } = this;
    const oldInstances = instances.splice(0, instances.length);

    this.finalizeVegaInstances(oldInstances);
    _view$.complete();
  }

  async create(...args: Parameters<typeof embed>): Promise<void> {
    const resultPromise = embed(...args);
    this.instances.push(resultPromise);

    try {
      const result = await resultPromise;
      this.onResult(result, resultPromise);
    } catch (error) {
      this.onError(error, resultPromise);
      throw error;
    }
  }

  private onResult(result: Result, source: Promise<Result>): void {
    const { instances, _view$ } = this;
    const index = instances.indexOf(source);
    if (index >= 0) {
      const oldInstances = instances.splice(0, index);
      this.finalizeVegaInstances(oldInstances);

      _view$.next(result.view);
    }
  }

  private onError(_error: unknown, source: Promise<Result>): void {
    const { instances } = this;
    const index = instances.indexOf(source);
    if (index >= 0) {
      instances.splice(index, 1);
    }
  }

  private finalizeVegaInstances(instances: Promise<Result>[]): void {
    instances.forEach(async instance => (await instance).finalize());
  }
}
