import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';


@NgModule({
  imports: [
    CommonModule,

    A11yModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [ConfirmationDialogComponent],
  exports: [ConfirmationDialogComponent]
})
export class ConfirmationDialogModule { }
