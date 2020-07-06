import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/angular';
import { GraphicSymbolData, TDatum, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { DataProcessorService } from '@ngx-dino/core';
import { Observable, of, Subscription } from 'rxjs';
import { View } from 'vega';
import embed from 'vega-embed';

import { VisualizationNode } from './interfaces';
import { scatterplotSpec, ScatterplotSpecOptions } from './scatterplot.vega';


@Component({
  selector: 'dvl-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.scss']
})
export class ScatterplotComponent implements VisualizationComponent,
    AfterViewInit, OnChanges, OnDestroy, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;
  @Input() nodeDefaults: Partial<VisualizationNode> = {
    strokeWidth: 1.5,
    gridlines: true,
    gridlinesColor: 'lightGray',
    gridlinesOpacity: 1,
    tickLabelColor: 'gray',
    showTicks: false,
    showAxisLabels: false,
    shape: 'circle',
    areaSize: 16,
    color: '#000',
    strokeColor: '#000007',
    transparency: 0,
    strokeTransparency: 0.25
  };

  private nodes: TDatum<VisualizationNode>[] = [];
  private nodesSubscription: Subscription;
  private view: View;

  @ViewChild('visualization', { read: ElementRef }) vizContainer: ElementRef<HTMLElement>;

  constructor(private dataProcessorService: DataProcessorService) { }

  async embedVisualization(options: ScatterplotSpecOptions = {}): Promise<void> {
    options.strokeWidth = this.data.properties.strokeWidth;
    options.gridlines = this.data.properties.gridlines;
    options.gridlinesColor = this.data.properties.gridlinesColor;
    options.gridlinesOpacity = this.data.properties.gridlinesOpacity;
    options.tickLabelColor = this.data.properties.tickLabelColor;
    options.showTicks = this.data.properties.showTicks;
    options.showAxisLabels = this.data.properties.showAxisLabels;
    options.shape = this.data.properties.shape;
    options.areaSize = this.data.properties.areaSize;
    options.color = this.data.properties.color;
    options.strokeColor = this.data.properties.strokeColor;
    options.transparency = this.data.properties.transparency;
    options.strokeTransparency = this.data.properties.strokeTransparency;

    if (this.view) {
      this.view.finalize();
    }
    const spec = scatterplotSpec(options);
    const results = await embed(this.vizContainer.nativeElement, spec, {renderer: 'svg'});
    this.view = results.view;
  }

  async doLayout(): Promise<void> {
    await this.embedVisualization({
      nodes: this.nodes || []
    });
  }

  refreshData(): void {
    if (this.nodesSubscription) {
      this.nodesSubscription.unsubscribe();
    }
    this.nodes = [];
    const nodes$ = this.getGraphicSymbolData<VisualizationNode>('points', this.nodeDefaults);
    this.nodesSubscription = nodes$.subscribe(nodes => { this.nodes = nodes; this.doLayout(); });
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
    if ('points' in changes) { this.refreshData(); }
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
    if (this.view) {
      this.view.finalize();
    }
  }
}
