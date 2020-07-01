import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/ngx-dino';
import { DataProcessorService } from '@ngx-dino/core';
import { Observable, of, Subscription } from 'rxjs';
import { View } from 'vega';
import embed from 'vega-embed';

import { VisualizationEdge, VisualizationNode } from './interfaces';
import { networkSpec, NetworkSpecOptions } from './network.vega';


@Component({
  selector: 'dvl-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements VisualizationComponent,
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
  @Input() edgeDefaults: Partial<VisualizationEdge> = {
    shape: 'circle',
    areaSize: 16,
    color: '#000',
    strokeColor: '#000007',
    transparency: 0,
    strokeTransparency: 0.25,
    strokeWidth: 1
  };

  private nodes: TDatum<VisualizationNode>[] = [];
  private edges: TDatum<VisualizationEdge>[] = [];
  private nodesSubscription: Subscription;
  private edgesSubscription: Subscription;
  private view: View;

  @ViewChild('visualization', { read: ElementRef }) vizContainer: ElementRef<HTMLElement>;

  constructor(private dataProcessorService: DataProcessorService) { }

  async embedVisualization(options: NetworkSpecOptions = {}): Promise<void> {
    if (this.view) {
      this.view.finalize();
    }
    const spec = networkSpec(options);
    const results = await embed(this.vizContainer.nativeElement, spec, {renderer: 'svg'});
    this.view = results.view;
  }

  async doLayout(): Promise<void> {
    await this.embedVisualization({
      nodes: this.nodes || [],
      edges: this.edges || []
    });
  }

  refreshData(): void {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    if (this.edgesSubscription) {
      this.edgesSubscription.unsubscribe();
    }
    this.nodes = [];
    this.edges = [];
    const nodes$ = this.getGraphicSymbolData<VisualizationNode>('nodes', this.nodeDefaults);
    const edges$ = this.getGraphicSymbolData<VisualizationNode>('edges', this.edgeDefaults);
    this.nodesSubscription = nodes$.subscribe(nodes => { this.nodes = nodes; this.doLayout(); });
    this.edgesSubscription = edges$.subscribe(edges => { this.edges = edges; this.doLayout(); });
  }

  ngAfterViewInit(): void {
    if (this.data?.properties?.nodeDefaults) {
      this.nodeDefaults = this.data.properties.nodeDefaults;
    }
    if (this.data?.properties?.edgeDefaults) {
      this.edgeDefaults = this.data.properties.edgeDefaults;
    }
    if (this.data) {
      this.refreshData();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) { this.refreshData(); }
  }
  dvlOnGraphicSymbolChange(changes: SimpleChanges): void {
    if ('nodes' in changes || 'edges' in changes) { this.refreshData(); }
  }
  dvlOnPropertyChange(changes: SimpleChanges): void {
    if ('nodeDefaults' in changes) {
      this.nodeDefaults = this.data.properties.nodeDefaults;
    }
    if ('edgeDefaults' in changes) {
      this.edgeDefaults = this.data.properties.edgeDefaults;
    }
    if ('nodeDefaults' in changes || 'edgeDefaults' in changes) {
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
    if (this.edgesSubscription) {
      this.edgesSubscription.unsubscribe();
    }
    if (this.view) {
      this.view.finalize();
    }
  }
}
