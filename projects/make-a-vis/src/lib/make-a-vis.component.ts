import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'mav-main',
  templateUrl: './make-a-vis.component.html',
  styleUrls: ['./make-a-vis.component.scss'],
})
export class MakeAVisComponent implements OnInit {
  @Input() theme = 'light-theme';

  constructor() { }

  ngOnInit() {
  }

}
