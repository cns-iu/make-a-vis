import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, Output, Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { View } from 'vega';
import { EmbedOptions, VisualizationSpec } from 'vega-embed';

import { ViewEvent, ViewManagerService } from './view-manager.service';


export type Spec = VisualizationSpec | string;
export type Options = EmbedOptions;
export type AutosizeObj = Record<'width' | 'height', boolean>;
export type Autosize = boolean | Partial<AutosizeObj>;


function empty() {
  // Intentionally empty
}


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

  @Input()
  set autosize(value: Autosize) {
    this._autosize = typeof value === 'boolean' ?
      { width: value, height: value } :
      { width: false, height: false, ...value };
  }
  get autosize(): Autosize {
    return this._autosize;
  }

  private _autosize: AutosizeObj = {
    // Default to true for backwards compatibility
    width: true,
    height: true
  };

  @Input() minSizeChange = 1;

  @Output() viewChange = this.manager.view$;
  @Output() viewLoading = this.manager.loading$;
  @Output() viewError = this.manager.error$;

  private readonly container: HTMLElement;
  private readonly subscriptions = this.manager.event$.subscribe(this.handleEvents.bind(this));
  private detach = empty;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    private readonly manager: ViewManagerService,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.container = elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('spec' in changes || 'options' in changes) {
      this.create();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.detach();
  }

  private create(): void {
    const { spec, options, manager, renderer } = this;
    if (spec) {
      const viewEl = renderer.createElement('div') as HTMLElement;
      manager.create(viewEl, spec, options);
    } else {
      this.detach();
    }
  }

  private handleEvents(event: ViewEvent): void {
    if (event.type === 'ready') {
      this.attach(event.view);
    } else if (event.type === 'error') {
      this.detach();
    }
  }

  private attach(view: View): void {
    const { cdr, container, renderer } = this;
    const viewEl = this.getRoot(view.container());
    const sensor = new ResizeSensor(viewEl, ({ width, height }) => {
      this.updateSize(viewEl, view, width, height);
    });

    this.detach();
    this.detach = () => {
      sensor.detach();
      renderer.removeChild(container, viewEl);
      cdr.markForCheck();
      this.detach = empty;
    };

    renderer.appendChild(container, viewEl);
    cdr.markForCheck();
  }

  private updateSize(viewEl: HTMLElement, view: View, width: number, height: number): void {
    const { _autosize: autosize } = this;
    const widthChanged = autosize.width && this.updateWidth(viewEl, view, width);
    const heightChanged = autosize.height && this.updateHeight(viewEl, view, height);

    if (widthChanged || heightChanged) {
      view.runAsync();
    }
  }

  private updateWidth(viewEl: HTMLElement, view: View, width: number): boolean {
    const { minSizeChange } = this;
    const hasActions = viewEl.classList.contains('has-actions');
    const padding = hasActions ? 38 : 0;
    const diff = Math.abs(width - view.width() - padding);
    if (diff >= minSizeChange) {
      view.width(width - padding);
      return true;
    }
    return false;
  }

  private updateHeight(_viewEl: HTMLElement, view: View, height: number): boolean {
    const { minSizeChange } = this;
    const diff = Math.abs(height - view.height());
    if (diff >= minSizeChange) {
      view.height(height);
      return true;
    }
    return false;
  }

  private getRoot(el: HTMLElement): HTMLElement {
    const { renderer } = this;
    let parentEl = renderer.parentNode(el) as HTMLElement;

    while (parentEl) {
      el = parentEl;
      parentEl = renderer.parentNode(parentEl);
    }

    return el;
  }
}
