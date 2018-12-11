import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mav-selection-graphic-variable-type',
  templateUrl: './graphic-variable-type.component.html',
  styleUrls: ['./graphic-variable-type.component.css']
})
export class GraphicVariableTypeComponent implements OnInit {
  graphicSymbolTypes = ['Record(Area)', 'Link(line)']; // TODO: temporary placeholder
  graphicVariableTypes = {
    'Record(Area)': ['X-Axis', 'Y-Axis', 'Area Color', 'Area Size', 'Area Shape'],
    'Link(line)': ['X-Axis', 'Y-Axis', 'Area Color', 'Area Size', 'Area Shape']
  }; // TODO: temporary placeholder

  constructor() { }

  ngOnInit() {
  }

}
