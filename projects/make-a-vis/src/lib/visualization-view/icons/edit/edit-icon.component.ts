import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mav-edit-icon',
  templateUrl: './edit-icon.component.html',
  styleUrls: ['./edit-icon.component.scss']
})
export class EditIconComponent implements OnInit {

  @Input() isActive: boolean;
  constructor() { }

  ngOnInit() {
  }
}
