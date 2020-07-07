import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/angular';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { DataProcessorService } from '@ngx-dino/core';
import { Options, Spec } from 'ngx-vega';
import { Observable, of, Subscription } from 'rxjs';
import embed from 'vega-embed';

import { VisualizationNode } from './interfaces';
import { scienceMapSpec, ScienceMapSpecOptions } from './science-map.vega';


@Component({
  selector: 'dvl-science-map',
  templateUrl: './science-map.component.html',
  styleUrls: ['./science-map.component.scss']
})
export class ScienceMapComponent implements VisualizationComponent,
    AfterViewInit, OnChanges, OnDestroy, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;
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

  private nodes: TDatum<VisualizationNode>[] = [];
  private nodesSubscription: Subscription;


  constructor(private dataProcessorService: DataProcessorService) { }

  updateSpec(): void {
    this.spec = scienceMapSpec({
      nodes: this.nodes || []
    });
  }

  refreshData(): void {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    this.nodes = [];
    const nodes$ = this.getGraphicSymbolData<VisualizationNode>('subdisciplinePoints', this.nodeDefaults);
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
    if ('subdisciplinePoints' in changes) { this.refreshData(); }
  }
  dvlOnPropertyChange(changes: SimpleChanges): void {
    if ('nodeDefaults' in changes) {
      this.nodeDefaults = this.data.properties.nodeDefaults;
      this.refreshData();
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
