import {
  ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges,
} from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { Subscription } from 'rxjs';
import { View } from 'vega';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { ViewManagerService } from './view-manager.service';


export type Spec = VisualizationSpec | string;
export type Options = EmbedOptions;

@Component({
  selector: 'ngx-vega',
  template: '',
  styleUrls: ['./vega.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ViewManagerService]
})
export class VegaComponent implements OnChanges, OnDestroy {
  @Input() spec: Spec;
  @Input() options?: Options;

  @Output() viewChange = this.manager.view$;

  private readonly container: HTMLElement;
  private viewEl?: HTMLElement;

  private readonly subscriptions = new Subscription();

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private readonly manager: ViewManagerService,
    private readonly renderer: Renderer2
  ) {
    this.container = elementRef.nativeElement;
    this.subscriptions.add(manager.view$.subscribe(view => this.onViewChange(view)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('spec' in changes || 'options' in changes) {
      this.createView();
    }
  }

  ngOnDestroy(): void {
    this.clearContainer();
    this.subscriptions.unsubscribe();
  }

  private onViewChange(view: View): void {
    const { container, renderer } = this;
    let viewEl = view.container();
    let parentEl: HTMLElement = renderer.parentNode(viewEl);

    // Find top wrapper element
    while (parentEl !== null) {
      viewEl = parentEl;
      parentEl = renderer.parentNode(viewEl);
    }

    this.clearContainer();
    this.viewEl = viewEl;

    renderer.appendChild(container, viewEl);
    // tslint:disable-next-line: no-unused-expression
    new ResizeSensor(viewEl, ({width, height}) => {
      view.width(width);
      view.height(height);
      view.runAsync();
    });
  }

  private createView(): void {
    const { spec, options, manager, renderer } = this;
    if (spec) {
      const viewEl = renderer.createElement('div') as HTMLElement;
      manager.create(viewEl, spec, options);
    }
  }

  private clearContainer(): void {
    const { container, viewEl, renderer } = this;
    if (viewEl) {
      ResizeSensor.detach(viewEl);
      renderer.removeChild(container, viewEl);
      this.viewEl = undefined;
    }
  }
}
