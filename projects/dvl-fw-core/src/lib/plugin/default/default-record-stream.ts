import { RawChangeSet } from '@ngx-dino/core';
import { defaults, get } from 'lodash';
import { defer, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { RawData, RecordStream } from '../../interfaces';

export type DefaultRecordStreamArg =
  Pick<RecordStream, 'id'> &
  Partial<Pick<RecordStream, 'label'>>;

export class DefaultRecordStream<T = any> implements RecordStream<T> {
  public id: string;
  public label: string;

  constructor(data: DefaultRecordStreamArg, private rawData: RawData) {
    Object.assign(this, data);
    defaults(this, { label: data.id });
  }

  asObservable(): Observable<RawChangeSet<T>> {
    return defer(() => this.getData()).pipe(
      map(RawChangeSet.fromArray),
      // A delay was added to allow for pagination to initialize properly for async data
      delay(10)
    );
  }

  async getData(): Promise<T[]> {
    return get(await this.rawData.getData(), this.id, []);
  }

  toJSON(): any {
    return { id: this.id, label: this.label };
  }
}
