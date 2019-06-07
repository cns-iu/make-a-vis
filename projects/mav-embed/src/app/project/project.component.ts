import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Project } from '@dvl-fw/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';

import { DataLinkService, DataLinkSource } from '../shared/services/data-link/data-link.service';
import { SourceType } from '../shared/services/project-loader/project-loader.service';
import { ProjectManagerService } from '../shared/services/project-manager/project-manager.service';

/**
 * A component for loading and referencing a dvl-fw project
 */
@Component({
  selector: 'mav-project',
  template: '',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProjectComponent implements DataLinkSource<Project>, OnChanges, OnInit, OnDestroy {
  /** The identifier for this project */
  @Input() id: string;
  /** The name of a global variable containing a project ot project yaml */
  @Input() data: string;
  /** The url to the project yaml */
  @Input() href: string;

  /** The project data */
  data$: Observable<Project> = EMPTY;
  /** An observable emitting when data changes */
  change$ = new BehaviorSubject<any>(undefined);

  /**
   * Creates an instance of project component.
   * @param linker The data linker
   * @param manager The project manager
   */
  constructor(private linker: DataLinkService, private manager: ProjectManagerService) { }

  /**
   * Angular's on change hook
   * Detext changes to id, data, and href
   * @param changes The changed values
   */
  ngOnChanges(changes: SimpleChanges) {
    const globalChanged = 'data' in changes;
    const hrefChanged = 'href' in changes;

    if (globalChanged || hrefChanged) {
      const oldGlobal = globalChanged ? (changes.data.previousValue || false) : undefined;
      const oldHref = hrefChanged ? (changes.href.previousValue || false) : undefined;
      this.unsetData(oldGlobal, oldHref);
      this.setData();
    } else if ('id' in changes) {
      this.changed();
    }

    if (!this.id) {
      throw new Error('mav-project must have an id attribute');
    }
  }

  /**
   * Angular's on init hook
   */
  ngOnInit() {
    this.linker.registerSource(this);
  }

  /**
   * Angular's on destroy hook
   * Cleans up subscriptions
   */
  ngOnDestroy() {
    this.linker.unregisterSource(this);
    this.unsetData();
  }

  /** Emits a change */
  private changed(): void { this.change$.next(undefined); }

  /**
   * Sets the data observable
   * @param [global] The global data name
   * @param [href] The data url
   */
  private setData(global = this.data, href = this.href): void {
    if (!global !== !href) { // XOR operation ;)
      const source = global || href;
      const type = global ? SourceType.global : SourceType.url;
      this.data$ = this.manager.add(source, type);
      this.changed();
    } else {
      this.data$ = of(undefined);
      this.changed();

      const errorMsg = global ?
        `mav-project #${this.id} cannot have both href and data attributes set` :
        `mav-project #${this.id} must have a href or a data attribute`;
      throw new Error(errorMsg);
    }
  }

  /**
   * Unsets the data observable
   * @param [global] The global data name
   * @param [href] The data url
   */
  private unsetData(global = this.data, href = this.href): void {
    if (!global !== !href) { // XOR operation ;)
      const source = global || href;
      const type = global ? SourceType.global : SourceType.url;
      this.manager.remove(source, type);
      this.data$ = EMPTY;
    }
  }
}
