import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dvlVisHost]'
})
export class VisHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
