import { RawChangeSet } from '@ngx-dino/core';
import { Observable } from 'rxjs';

export interface RecordStream<T = any> {
  id: string;
  label: string;

  asObservable(): Observable<RawChangeSet<T>>;
  toJSON(): any;
}
