import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { castArray, every, filter, map, propertyOf, some } from 'lodash';

import { Project } from '../shared/project';
import { GraphicSymbolOption, Visualization } from '../shared/visualization';
import { LegendType } from './item/item.component';

export type LegendOrientation = 'horizontal' | 'vertical';

interface ItemGroup extends Array<string> {
  id: string;
  label: string;
}

@Component({
  selector: 'dvl-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnChanges, OnDestroy {
  @Input() project: Project;
  @Input() visualization: Visualization;
  @Input() symbolGroups: string | string[];
  @Input() orientation: LegendOrientation;
  @Input() type: LegendType;
  @Input() advanced: boolean;

  groups: ItemGroup[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const { project, visualization } = this;
    const checkedValues = [project, visualization];
    const checkedProperties = ['visualization', 'symbolGroups'];

    if (!every(checkedValues)) {
      this.clear();
    } else if (some(checkedProperties, propertyOf(changes))) {
      this.update();
    }
  }

  ngOnDestroy() {
    this.clear();
  }

  private update(): void {
    const { visualization: { graphicSymbolOptions: symbolOpts }, symbolGroups } = this;
    const ids = new Set(symbolGroups === undefined ? map(symbolOpts, 'id') : castArray(symbolGroups));
    const filteredOpts = filter(symbolOpts, ({ id }) => ids.has(id));
    const groups = map(filteredOpts, this.createGroup);
    const filteredGroups = filter(groups, 'length');

    this.groups = filteredGroups;
  }

  private clear(): void {
    this.groups = [];
  }

  private createGroup(this: void, symbolOpt: GraphicSymbolOption): ItemGroup {
    const { id, label, graphicVariableOptions } = symbolOpt;
    const items = filter(map(graphicVariableOptions, 'id'));
    return Object.assign(items, { id, label });
  }
}
