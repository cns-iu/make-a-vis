import { Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Project, Visualization } from '@dvl-fw/core';
import { filter, lowerCase } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchAll } from 'rxjs/operators';

import { DataLinkService, DataLinkTarget } from '../shared/services/data-link/data-link.service';

@Component({
  selector: 'mav-visualization',
  template: '<dvl-visualization [data]="visualization$ | async"></dvl-visualization>',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VisualizationComponent implements DataLinkTarget<Project>, OnChanges, OnInit, OnDestroy {
  @Input() project: string;
  @Input() index: string;

  source: string;
  change$ = new BehaviorSubject<any>(undefined);

  private _currentData$: Observable<Project> = undefined;
  private _index$ = new BehaviorSubject<[string, number]>(['', 0]);
  private _visualization$ = new Subject<Observable<Visualization>>();
  visualization$: Observable<Visualization> = this._visualization$.pipe(switchAll());

  constructor(private linker: DataLinkService, private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('project' in changes) { this.setProject(); }
    if ('index' in changes) { this.setIndex(); }
  }

  ngOnInit() {
    this.linker.registerTarget(this);
    this.setProject();
  }

  ngOnDestroy() {
    this.linker.unregisterTarget(this);
  }

  connect(data$: Observable<Project>): void {
    const { _currentData$, _index$, zone } = this;
    if (_currentData$ === data$) { return; }

    const visualization = combineLatest([data$, _index$]).pipe(
      map(([project, [type, index]]) => this.findVisualization(project, type, index)),
      catchError(error => {
        zone.onError.emit(error);
        return of(undefined);
      }),
      distinctUntilChanged()
    );

    this._currentData$ = data$;
    this._visualization$.next(visualization);
  }

  private changed(): void { this.change$.next(undefined); }

  private setProject(project = this.project): void {
    if (!project) {
      this.connect(of(undefined));
      throw new Error('mav-visualization must be connected to a mav-project');
    } else if (!project.startsWith('#')) {
      this.connect(of(undefined));
      throw new Error(`Invalid project reference '${project}' References must start with '#'`);
    }

    this.source = project.slice(1);
    this.changed();
  }

  private setIndex(index = this.index): void {
    index = index || '0';
    const match = /^(\w+:)?((\+|-)?(0|([1-9][0-9]*)))$/i.exec(index);
    if (!match) { throw new Error(`Invalid index selector '${index}'`); }
    this._index$.next([lowerCase(match[1]), Number(match[2])]);
  }

  private findVisualization(project: Project, type: string, index: number): Visualization {
    if (!project) { return undefined; }

    const visualizations = project.visualizations;
    const filtered = type ? filter(visualizations, ['template', type]) : visualizations;
    const visIndex = index >= 0 ? index : filtered.length + index;
    if (visIndex < 0 || visIndex >= filtered.length) {
      const error = new Error(`Invalid visualization index '${index}'`);
      this.zone.onError.emit(error);
      return undefined;
    }

    return filtered[visIndex];
  }
}
