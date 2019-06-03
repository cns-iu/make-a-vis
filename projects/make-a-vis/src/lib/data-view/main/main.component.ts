// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { DataService, DataSource } from '../shared/data.service';

@Component({
  selector: 'mav-data-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  /**
   * Data sources observable
   */
  dataSources: Observable<DataSource[]>;
  /**
   * Data subscription for the data-sources
   */
  dataSubscription: Subscription;
  /**
   * Boolean to show initial info message in the data view
   */
  showDataViewMessage = true;

  constructor(private dataService: DataService) {
    this.dataSources = this.dataService.dataSourcesChanged;
    this.dataSubscription = this.dataSources.subscribe((d) => {
      if (d.length > 0) {
        this.showDataViewMessage = false;
      } else {
        this.showDataViewMessage = true;
      }
    });
  }

  /**
   * Gets padding according to the level of hierarchy of the data table
   * @param level level in hierarchy of the data table
   * @returns a padding value in rems
   */
  getPadding(level: number): number {
    return 2 * level;
  }

  /**
   * on destroy lifecycle hook
   */
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
