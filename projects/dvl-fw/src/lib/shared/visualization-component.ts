// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { SimpleChanges } from '@angular/core';

import { Visualization } from './visualization';

export interface VisualizationComponent {
  data: Visualization;
}

export interface OnPropertyChange {
  dvlOnPropertyChange(changes: SimpleChanges): void;
}

export interface OnGraphicSymbolChange {
  dvlOnGraphicSymbolChange(changes: SimpleChanges): void;
}
