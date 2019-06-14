import { Component, ViewEncapsulation, Input } from '@angular/core';

import { VisualizationComponent } from '../visualization/visualization.component';
import { Observable } from 'rxjs';
import { Project } from '@dvl-fw/core';

@Component({
  selector: 'mav-legend',
  template: `
    <dvl-legend [project]="project$ | async" [visualization]="visualization$ | async"
                [symbolGroups]="symbolGroups" [orientation]="orientation" [type]="type"
                [advanced]="advanced === true || advanced === 'true'">
    </dvl-legend>
  `,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LegendComponent extends VisualizationComponent {
  @Input() set groups(groups: string) { this.symbolGroups = JSON.parse(groups); }

  @Input() orientation: string;
  @Input() type: string;
  @Input() advanced: any;

  project$: Observable<Project>;
  symbolGroups: string | string[];

  connect(data$: Observable<Project>): void {
    super.connect(data$);
    this.project$ = data$;
  }
}
