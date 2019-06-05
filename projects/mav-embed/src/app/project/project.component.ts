import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Project } from '@dvl-fw/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';

import { DataLinkService, DataLinkSource } from '../shared/services/data-link/data-link.service';
import { SourceType } from '../shared/services/project-loader/project-loader.service';
import { ProjectManagerService } from '../shared/services/project-manager/project-manager.service';

@Component({
  selector: 'mav-project',
  template: '',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProjectComponent implements DataLinkSource<Project>, OnChanges, OnInit, OnDestroy {
  @Input() id: string;
  @Input() data: string;
  @Input() href: string;

  data$: Observable<Project> = EMPTY;
  change$ = new BehaviorSubject<any>(undefined);

  constructor(private linker: DataLinkService, private manager: ProjectManagerService) { }

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

  ngOnInit() {
    this.linker.registerSource(this);
  }

  ngOnDestroy() {
    this.linker.unregisterSource(this);
    this.unsetData();
  }

  private changed(): void { this.change$.next(undefined); }

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

  private unsetData(global = this.data, href = this.href): void {
    if (!global !== !href) { // XOR operation ;)
      const source = global || href;
      const type = global ? SourceType.global : SourceType.url;
      this.manager.remove(source, type);
      this.data$ = EMPTY;
    }
  }
}
