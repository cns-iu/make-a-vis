import { Component, OnInit, Input } from '@angular/core';
import { Visualization } from '../../../../shared/visualization';

@Component({
  selector: 'dvl-vis-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css']
})
export class GeomapComponent implements OnInit {
  @Input() data: Visualization;

  constructor() { }

  ngOnInit() {
  }
}
