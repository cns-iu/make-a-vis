import { Component, Input } from '@angular/core';

@Component({
  selector: 'mav-visualization-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() label: string;
  @Input() icon: string;
}
