import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/ngx-dino';
import { DataProcessorService } from '@ngx-dino/core';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { View } from 'vega';
import embed from 'vega-embed';

import { VisualizationNode, VisualizationEdge } from './interfaces';
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

  nodes$: Observable<TDatum<VisualizationNode>[]> = EMPTY;
  private nodesSubscription: Subscription;
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

  async layout(nodes: TDatum<VisualizationNode>[]): Promise<void> {
      await this.embedVisualization({nodes});
      // if (!this.view) {
      //   this.embedVisualization();
      // }
      // this.view.data('nodes', nodes);
      // await this.view.runAsync();
  }

  async refreshSpec(): Promise<void> {
    await this.embedVisualization();
    this.refreshNodes();
  }

  refreshNodes(): void {
    if (this.data) {
      this.nodes$ = this.getGraphicSymbolData<VisualizationNode>('nodes', this.nodeDefaults);
    } else {
      this.nodes$ = of([]);
    }
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    this.nodesSubscription = this.nodes$.subscribe(nodes => this.layout(nodes));
  }

  ngAfterViewInit(): void {
    if (this.data?.properties?.nodeDefaults) {
      this.nodeDefaults = this.data.properties.nodeDefaults;
    }
    if (this.data) {
      this.refreshNodes();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) { this.refreshNodes(); }
  }
  dvlOnGraphicSymbolChange(changes: SimpleChanges): void {
    if ('nodes' in changes) { this.refreshNodes(); }
  }
  dvlOnPropertyChange(changes: SimpleChanges): void {
    if ('nodeDefaults' in changes) {
      this.nodeDefaults = this.data.properties.nodeDefaults;
      this.refreshNodes();
    }
  }
  getGraphicSymbolData<T>(slot: string, defaults: { [gvName: string]: any } = {}): Observable<TDatum<T>[]> {
    if (!this.data?.graphicSymbols?.nodes?.graphicVariables?.identifier) {
      return of([]);
    } else {
      return new GraphicSymbolData(this.dataProcessorService, this.data, slot, defaults).asDataArray();
    }
  }
  ngOnDestroy(): void {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    if (this.view) {
      this.view.finalize();
    }
  }
}
