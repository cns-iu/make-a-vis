import { AfterViewInit, Component, Input, Output, OnChanges, OnDestroy, SimpleChanges, EventEmitter } from '@angular/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/angular';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { DataProcessorService } from '@ngx-dino/core';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import centroid from '@turf/centroid';
import { Feature, MultiPolygon, Point, Polygon } from '@turf/helpers';
import { Options, Spec } from 'ngx-vega';
import { Observable, of, Subscription } from 'rxjs';

import { GeomapDataService } from './geomap-data.service';
import { DEFAULT_GEOMAP_SPEC_OPTIONS, geomapSpec, GeomapSpecOptions } from './geomap.vega';
import { VisualizationEdge, VisualizationNode } from './interfaces';
import { createGeoZoomPatch, patchUsaGeoZoom } from './utils/geomap-zoom-patch';
import { PROJECTIONS } from './utils/projections';
import { map } from 'rxjs/operators';


@Component({
  selector: 'dvl-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.scss']
})
export class GeomapComponent implements VisualizationComponent,
    AfterViewInit, OnChanges, OnDestroy, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;
  @Input() propertyDefaults: Partial<GeomapSpecOptions> = {
    ...DEFAULT_GEOMAP_SPEC_OPTIONS,
    ...{
      enableZoomPan: false,
      basemap: 'usa',
      // country: 'United States of America',
      // state: 'Indiana',
      // projection: 'mercator'
    }
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
  @Input() userOptions: GeomapSpecOptions = this.propertyDefaults;

  spec: Spec;
  options: Options;

  readonly basemaps = ['usa', 'world'];
  readonly projections = PROJECTIONS;
  readonly states$: Observable<string[]> = this.geomapDataService.getStates().pipe(map(l => l.map(s => s.properties.name).sort()));
  readonly countries$: Observable<string[]> = this.geomapDataService.getCountries().pipe(map(l => l.map(s => s.properties.name).sort()));

  private nodes: TDatum<VisualizationNode>[] = [];
  private edges: TDatum<VisualizationEdge>[] = [];
  private nodesSubscription: Subscription;
  private edgesSubscription: Subscription;

  constructor(private dataProcessorService: DataProcessorService, private geomapDataService: GeomapDataService) { }

  async updateSpec(newOptions?: GeomapSpecOptions): Promise<void> {
    const options = {...this.propertyDefaults, ...this.data.properties, ...newOptions};
    this.userOptions = options;
    let patch = patchUsaGeoZoom;

    options.showNodeLabels = !!this.data?.graphicSymbols['nodes']?.graphicVariables?.label;

    if (options.country && options.enableZoomPan) {
      const country = await this.geomapDataService.getCountry(options.country);
      if (country) {
        const center = centroid(country) as Feature<Point>;
        const coords = center.geometry.coordinates as [number, number];
        patch = createGeoZoomPatch({
          center: [0 - coords[0], coords[1]],
          zoomLevels: [10, 250000],
          initialZoom: 400
        });
      }
    }

    this.spec = geomapSpec({
      ...options,
      nodes: this.nodes || [],
      edges: this.edges || []
    });

    if (options.enableZoomPan || patch !== patchUsaGeoZoom) {
      this.options = {renderer: 'svg', patch};
    } else {
      this.options = {renderer: 'svg'};
    }

    // FIXME: Mother Mary, forgive me my sins
    const originalVisualization = (this.data as unknown as {original: Visualization}).original;
    if (originalVisualization) {
      originalVisualization.properties = options;
    }
    this.data.properties = options;
  }

  async refreshData(): Promise<void> {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    if (this.edgesSubscription) {
      this.edgesSubscription.unsubscribe();
    }

    const baseOptions = {
      ...this.propertyDefaults,
      ...this.data.properties
    };
    let country: Feature<Polygon|MultiPolygon> | undefined;
    if (baseOptions.country && !baseOptions.enableZoomPan) {
      country = await this.geomapDataService.getCountry(baseOptions.country);
    }

    this.nodes = [];
    const nodes$ = this.getGraphicSymbolData<VisualizationNode>('nodes', this.nodeDefaults);
    this.nodesSubscription = nodes$.subscribe(nodes => {
      this.nodes = nodes.filter(
        n => isFinite(n.latitude) && isFinite(n.longitude)
      );
      if (country) {
        this.nodes = nodes.filter(n =>
          booleanPointInPolygon([n.longitude, n.latitude], country)
        );
      }
      this.updateSpec();
    });
    this.edges = [];
    const edges$ = this.getGraphicSymbolData<VisualizationEdge>('edges', this.edgeDefaults);
    this.edgesSubscription = edges$.subscribe(edges => {
      this.edges = edges.filter(
        e => isFinite(e.latitude1) && isFinite(e.longitude1) && isFinite(e.latitude2) && isFinite(e.longitude2)
      );
      if (country) {
        this.edges = edges.filter(e =>
          booleanPointInPolygon([e.longitude1, e.latitude1], country) && booleanPointInPolygon([e.longitude2, e.latitude2], country)
        );
      }
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
      if (!this.userOptions) {
        const options = {...this.propertyDefaults, ...this.data.properties, ...this.userOptions};
        this.userOptions = options;
      }
      this.refreshData();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes || 'userOptions' in changes) {
      this.refreshData();
    }
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
    this.refreshData();
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
