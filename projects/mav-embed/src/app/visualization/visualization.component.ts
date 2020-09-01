import { Component, Input, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Project, Visualization } from '@dvl-fw/core';
import { filter, lowerCase } from 'lodash';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, switchAll } from 'rxjs/operators';

import { DataLinkService, DataLinkTarget } from '../shared/services/data-link/data-link.service';

/**
 * Visualization display component
 */
@Component({
  selector: 'mav-visualization',
  template: '<dvl-visualization [data]="visualization$ | async"></dvl-visualization>'
})
export class VisualizationComponent implements DataLinkTarget<Project>, OnChanges, OnInit, OnDestroy {
  /** The identifier of the project component from which to fetch data */
  @Input() project: string;
  /** The index of the visualization in the project */
  @Input() index: string;

  /** The data source identifier */
  source: string;
  /** Emits whenever the data linking needs updating */
  change$ = new BehaviorSubject<any>(undefined);

  /** The observable for which the current data is fetched */
  private _currentData$: Observable<Project> = undefined;
  /** Emits the current index */
  private _index$ = new BehaviorSubject<[string, number]>(['', 0]);
  /** Emits the observables providing data */
  private _visualization$ = new Subject<Observable<Visualization>>();
  /** Emits the current visualization to display */
  visualization$: Observable<Visualization> = this._visualization$.pipe(switchAll());

  /**
   * Creates an instance of visualization component.
   * @param linker The data linker service
   * @param zone Angular's zone
   */
  constructor(private linker: DataLinkService, private zone: NgZone) { }

  /**
   * Angular's on change hook
   * Detects changes to project and index
   * @param changes The updated values
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('project' in changes) { this.setProject(); }
    if ('index' in changes) { this.setIndex(); }
  }

  /**
   * Angular's on init hook
   */
  ngOnInit() {
    this.linker.registerTarget(this);
    this.setProject();
  }

  /**
   * Angular's on destroy hook
   */
  ngOnDestroy() {
    this.linker.unregisterTarget(this);
  }

  /**
   * Connects to a data source observable
   * @param data$ The observable emitting project data
   */
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

  /**
   * Helper function for indicating that the data link needs updating.
   */
  private changed(): void { this.change$.next(undefined); }

  /**
   * Sets the project identifier
   * @param [project] The identifier
   */
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

  /**
   * Sets the visualization index
   * @param [index] The index
   */
  private setIndex(index = this.index): void {
    index = index || '0';
    const match = /^(\w+:)?((\+|-)?(0|([1-9][0-9]*)))$/i.exec(index);
    if (!match) { throw new Error(`Invalid index selector '${index}'`); }
    this._index$.next([lowerCase(match[1]), Number(match[2])]);
  }

  /**
   * Looks up the visualization for an index
   * @param project The project data
   * @param type The visualization type
   * @param index The visualization index
   * @returns visualization if it can be found, otherwise undefined
   */
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
