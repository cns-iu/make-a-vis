import { Component, ComponentFactoryResolver, Input, OnInit, OnChanges, SimpleChanges, Type, ViewChild } from '@angular/core';
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
  visualizationComponent: Type<VisualizationComponent>;
  visualizationComponentInstance: VisualizationComponent;

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
    viewContainerRef.clear();

    if (this.visualizationComponent) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.visualizationComponent);
      const componentRef = viewContainerRef.createComponent(componentFactory);
      this.visualizationComponentInstance = componentRef.instance;
      this.visualizationComponentInstance.data = this.data;
    }
  }
}
