import { Observable } from 'rxjs';
import { RawChangeSet } from '@ngx-dino/core';


export interface RecordStream<T = any> {
  id: string;
  label: string;

  asObservable(): Observable<RawChangeSet<T>>;
  toJSON(): T[];
}
