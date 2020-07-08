import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/angular';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { DataProcessorService } from '@ngx-dino/core';
import { Options, Spec } from 'ngx-vega';
import { Observable, of, Subscription } from 'rxjs';

import { patchUsaGeoZoom } from './utils/geomap-zoom-patch';
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
    enableZoomPan: false
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

  spec: Spec;
  options: Options;

  private nodes: TDatum<VisualizationNode>[] = [];
  private edges: TDatum<VisualizationEdge>[] = [];
  private nodesSubscription: Subscription;
  private edgesSubscription: Subscription;

  constructor(private dataProcessorService: DataProcessorService) { }

  updateSpec(): void {
    const options = {
      ...this.propertyDefaults,
      ...this.data.properties,
      nodes: this.nodes || [],
      edges: this.edges || []
    };
    this.spec = geomapSpec(options);
    if (options.enableZoomPan) {
      this.options = {renderer: 'svg', patch: patchUsaGeoZoom};
    } else {
      this.options = {renderer: 'svg'};
    }
  }

  refreshData(): void {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    if (this.edgesSubscription) {
      this.edgesSubscription.unsubscribe();
    }
    this.nodes = [];
    const nodes$ = this.getGraphicSymbolData<VisualizationNode>('nodes', this.nodeDefaults);
    this.nodesSubscription = nodes$.subscribe(nodes => {
      this.nodes = nodes.filter(
        n => isFinite(n.latitude) && isFinite(n.longitude)
      );
      this.updateSpec();
    });
    this.edges = [];
    const edges$ = this.getGraphicSymbolData<VisualizationEdge>('edges', this.edgeDefaults);
    this.edgesSubscription = edges$.subscribe(edges => {
      this.edges = edges.filter(
        e => isFinite(e.latitude1) && isFinite(e.longitude1) && isFinite(e.latitude2) && isFinite(e.longitude2)
      );
      this.updateSpec();
    });
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
    if (this.edgesSubscription) {
      this.edgesSubscription.unsubscribe();
    }
  }
}
