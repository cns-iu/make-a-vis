import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/angular';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { DataProcessorService } from '@ngx-dino/core';
import { Options, Spec } from 'ngx-vega';
import { Observable, of, Subscription } from 'rxjs';

import { VisualizationNode } from './interfaces';
import { temporalBargraphSpec, TemporalBargraphSpecOptions } from './temporal-bargraph.vega';


@Component({
  selector: 'dvl-temporal-bargraph',
  templateUrl: './temporal-bargraph.component.html',
  styleUrls: ['./temporal-bargraph.component.scss']
})
export class TemporalBargraphComponent implements VisualizationComponent,
    AfterViewInit, OnChanges, OnDestroy, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;
  @Input() propertyDefaults: Partial<TemporalBargraphSpecOptions> = {
    expanded: false
  };
  @Input() nodeDefaults: Partial<VisualizationNode> = {
    shape: 'circle',
    areaSize: 16,
    color: '#000',
    strokeColor: '#000007',
    transparency: 0,
    strokeTransparency: 0.25,
    strokeWidth: 1
  };

  spec: Spec;
  options: Options = { renderer: 'svg' };
  userOptions: TemporalBargraphSpecOptions;
  expanded = false;
  optionsHidden = true;

  private nodes: TDatum<VisualizationNode>[] = [];
  private nodesSubscription: Subscription;

  constructor(private dataProcessorService: DataProcessorService) { }

  updateSpec(newOptions: TemporalBargraphSpecOptions = {}): void {
    const options = {...this.propertyDefaults, ...this.data.properties, ...newOptions};
    this.userOptions = options;
    this.data.properties = options;

    this.spec = temporalBargraphSpec({
      hasYOrder: !!this.data?.graphicSymbols['bars']?.graphicVariables?.hasOwnProperty('y-order'),
      nodes: this.nodes || [],
      ...options
    });

    const originalVisualization = (this.data as unknown as {original: Visualization}).original;
    if (originalVisualization) {
      originalVisualization.properties = options;
    }
  }

  togglePanel() {
    this.optionsHidden = !this.optionsHidden;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.updateSpec({expanded: this.expanded} as TemporalBargraphSpecOptions);
  }

  refreshData(): void {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    this.nodes = [];
    const nodes$ = this.getGraphicSymbolData<VisualizationNode>('bars', this.nodeDefaults);
    this.nodesSubscription = nodes$.subscribe(nodes => {
      this.nodes = nodes;
      this.updateSpec();
    });
  }

  ngAfterViewInit(): void {
    if (this.data?.properties?.nodeDefaults) {
      this.nodeDefaults = this.data.properties.nodeDefaults;
    }
    if (this.data) {
      this.refreshData();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) { this.refreshData(); }
  }
  dvlOnGraphicSymbolChange(changes: SimpleChanges): void {
    if ('bars' in changes) { this.refreshData(); }
  }
  dvlOnPropertyChange(changes: SimpleChanges): void {
    if ('nodeDefaults' in changes) {
      this.nodeDefaults = this.data.properties.nodeDefaults;
      this.refreshData();
    } else {
      this.updateSpec();
    }
  }
  getGraphicSymbolData<T>(slot: string, defaults: { [gvName: string]: any } = {}): Observable<TDatum<T>[]> {
    if (!this.data?.graphicSymbols[slot]?.graphicVariables?.identifier) {
      return of([]);
    } else {
      return new GraphicSymbolData(this.dataProcessorService, this.data, slot, defaults).asDataArray();
    }
  }
  ngOnDestroy(): void {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
  }
}
