import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { ProjectManagerService } from '../shared/services/project-manager/project-manager.service';

@Component({
  selector: 'mav-project',
  template: '',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ProjectComponent implements OnChanges {
  @Input() id: string;
  @Input() data: string;
  @Input() href: string;

  constructor(manager: ProjectManagerService) {
    // TODO
  }

  ngOnChanges(changes: SimpleChanges) {
    // TODO
  }
}
