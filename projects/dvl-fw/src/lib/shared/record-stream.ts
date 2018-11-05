// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Observable } from 'rxjs';

import { RawChangeSet } from '@ngx-dino/core';


export interface RecordStream<T = any> {
  id: string;
  label: string;

  asObservable(): Observable<RawChangeSet<T>>;
  toJSON(): any;
}
