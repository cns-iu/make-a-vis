import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Visualization } from '../shared/visualization';
import { VisualizationComponent } from '../shared/visualization-component';

import { VisHostDirective } from './vis-host.directive';

@Component({
  selector: 'dvl-visualization',
  template: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class DvlFwVisualizationComponent implements OnInit, OnChanges {
  @Input() data: Visualization;

  @ViewChild(VisHostDirective) visHost: VisHostDirective;
  componentRef: ComponentRef<VisualizationComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.loadComponent();
    }
  }

  loadComponent() {
    const viewContainerRef = this.visHost.viewContainerRef;
    this.componentRef = null;
    viewContainerRef.clear();

    if (this.data && this.data.component) {
      const componentType = this.data.component; // || DefaultVisualizationComponent;
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = viewContainerRef.createComponent(componentFactory);
      this.componentRef.instance.data = this.data;
    } else if (this.data) {
      console.log(`Visualization Component is missing for type: ${this.data.template}`, this.data);
    }
  }
}
