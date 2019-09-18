import { RawChangeSet } from '@ngx-dino/core';
import { InteropObservable, Observable } from 'rxjs';

export interface RecordStream<T = any> {
  id: string;
  label: string;

  asObservable(): Observable<RawChangeSet<T>> | InteropObservable<RawChangeSet<T>>;
  toJSON(): any;
}
