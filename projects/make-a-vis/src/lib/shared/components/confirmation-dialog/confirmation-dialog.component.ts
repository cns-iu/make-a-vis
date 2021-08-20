import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface ConfirmationDialogOptions {
  title: string;
  content: string;
  acceptText?: string;
  cancelText?: string;
}


@Component({
  selector: 'mav-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  readonly title: string;
  readonly content: string;
  readonly acceptText: string;
  readonly cancelText: string;

  constructor(@Inject(MAT_DIALOG_DATA) options: ConfirmationDialogOptions) {
    ({
      title: this.title,
      content: this.content,
      acceptText: this.acceptText = 'Confirm',
      cancelText: this.cancelText = 'Cancel'
    } = options);
  }
}
