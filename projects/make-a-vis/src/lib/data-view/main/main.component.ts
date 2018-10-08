import { Component, OnInit } from '@angular/core';
import { DataService, DataSource } from '../shared/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'mav-data-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dataSources: Observable<DataSource[]>;

  constructor(private dataService: DataService) {
    this.dataSources = dataService.dataSourcesChanged;
  }

  ngOnInit() {
  }
}
