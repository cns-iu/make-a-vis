import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';


/**
 * Overlay component that displays a progress spinner and
 * an optional text description.
 */
@Component({
  selector: 'mav-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerOverlayComponent {
  /** HTML class */
  @HostBinding('class') readonly className = 'mav-spinner-overlay';

  /** Whether the overlay is active/showing. */
  @Input() @HostBinding('class.active') active = false;

  /** Optional text description displayed alongside the spinner. */
  @Input() text: string;

  /** Whether to show only text and no spinner */
  @Input() textOnly: boolean | string | null | undefined;

  get textOnlyAsBoolean(): boolean {
    return this.textOnly != null && `${this.textOnly}` !== 'false';
  }
}
