import {
  Component, ComponentFactoryResolver, ComponentRef,
  Input, OnInit, OnChanges, SimpleChanges, ViewContainerRef
} from '@angular/core';
import { isFunction } from 'lodash';
import { Visualization } from '../shared/visualization';
import { VisualizationComponent } from '../shared/visualization-component';
import { ClonedVisualization } from './utility';

@Component({
  selector: 'dvl-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class DvlFwVisualizationComponent implements OnInit, OnChanges {
  @Input() data: Visualization;

  private componentRef: ComponentRef<VisualizationComponent>;
  private currentData: Visualization;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    const { componentFactoryResolver, data, viewContainerRef } = this;
    this.componentRef = null;
    viewContainerRef.clear();

    if (data && data.component) {
      const componentType = data.component; // || DefaultVisualizationComponent;
      const componentFactory = componentFactoryResolver.resolveComponentFactory(componentType);
      this.componentRef = viewContainerRef.createComponent(componentFactory);
      this.componentRef.instance.data = data;
    } else if (data) {
      console.log(`Visualization Component is missing for type: ${data.template}`, data);
    }
  }

  private callDvlLifecycleHook(name: string, ...args: any[]): void {
    const ref = this.componentRef;
    const instance = ref && ref.instance;
    const hook = instance && instance[name];
    if (isFunction(hook)) {
      hook.apply(instance, args);
    }
  }
}
