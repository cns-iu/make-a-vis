import {
  ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { View } from 'vega';
import embed from 'vega-embed';

import { ViewManagerService } from '../../services/view-manager/view-manager.service';


type EmbedParameters = Parameters<typeof embed>;
export type Spec = EmbedParameters[1];
export type Options = NonNullable<EmbedParameters[2]>;

@Component({
  selector: 'ngx-vega',
  template: '',
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
    const viewEl = view.container();

    this.clearContainer();

    this.viewEl = viewEl;
    renderer.appendChild(container, viewEl);
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
      renderer.removeChild(container, viewEl);
      this.viewEl = undefined;
    }
  }
}
