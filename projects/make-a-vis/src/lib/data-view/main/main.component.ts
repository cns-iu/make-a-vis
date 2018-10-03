import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'mav-data-view',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  dataSources: any[];

  constructor(private dataService: DataService) {
    this.dataSources = [];
    dataService.dataSourceSubject.subscribe((ds) => {
      this.dataSources.push(ds);
    });
  }

  ngOnInit() {
  }
}
