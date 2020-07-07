import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/angular';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { DataProcessorService } from '@ngx-dino/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { View } from 'vega';
import embed from 'vega-embed';

import { geomapSpec, GeomapSpecOptions } from './geomap.vega';
import { VisualizationEdge, VisualizationNode } from './interfaces';


@Component({
  selector: 'dvl-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.scss']
})
export class GeomapComponent implements VisualizationComponent,
    AfterViewInit, OnChanges, OnDestroy, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;
  @Input() propertyDefaults: Partial<GeomapSpecOptions> = {

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

  async embedVisualization(options: GeomapSpecOptions = {}): Promise<void> {
    if (this.view) {
      this.view.finalize();
    }
    const spec = geomapSpec({ ...this.propertyDefaults, ...this.data.properties, ...options});
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
    this.nodesSubscription = this.getGraphicSymbolData<VisualizationNode>('nodes', this.nodeDefaults)
      .pipe(
        map(nodes => nodes.filter(
          n => isFinite(n.latitude) && isFinite(n.longitude)
        )),
        tap(nodes => this.nodes = nodes)
      )
      .subscribe(nodes => this.doLayout());

    this.edgesSubscription = this.getGraphicSymbolData<VisualizationEdge>('edges', this.edgeDefaults)
      .pipe(
        map(edges => edges.filter(
          e => isFinite(e.latitude1) && isFinite(e.longitude1) && isFinite(e.latitude2) && isFinite(e.longitude2)
        )),
        tap(edges => this.edges = edges)
      )
      .subscribe(edges => this.doLayout());
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
    } else {
      this.doLayout();
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
