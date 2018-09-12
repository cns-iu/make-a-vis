import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewprojectService {

  constructor() { }

  getData(): string {

    console.log('get new project service called');
    return '';
  }
}
