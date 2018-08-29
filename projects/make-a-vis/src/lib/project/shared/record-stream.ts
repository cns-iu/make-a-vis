import { Observable } from 'rxjs';
import { ChangeSet } from '@ngx-dino/core';

export interface RecordStream<T = any> {
  id: string;
  label: string;

  asObservable(): Observable<ChangeSet<T>>;
  toJSON(): T[];
}
