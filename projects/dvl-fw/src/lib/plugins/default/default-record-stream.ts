import { access, RawChangeSet } from '@ngx-dino/core';
import { Observable, defer } from 'rxjs';
import { map } from 'rxjs/operators';

import { RawData } from '../../shared/raw-data';
import { RecordStream } from '../../shared/record-stream';


export class DefaultRecordStream<T = any> implements RecordStream<T> {
  public id: string;
  public label: string;
  constructor(data: {id: string, label?: string}, private rawData: RawData) {
    Object.assign(this, { id: data.id, label: data.label || data.id });
  }
  asObservable(): Observable<RawChangeSet<T>> {
    return defer<T[]>(this.getData.bind(this)).pipe(map(RawChangeSet.fromArray));
  }
  async getData(): Promise<T[]> {
    const data = await this.rawData.getData();
    return access<T[]>(this.id, []).get(data);
  }
  toJSON(): any {
    return { id: this.id, label: this.label || undefined };
  }
}
