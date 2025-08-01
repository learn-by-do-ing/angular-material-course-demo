import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, forwardRef, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

@Component({
  selector: 'app-overlay-progress',
  imports: [
    MatSlider,
    MatSliderThumb,
    FormsModule,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
  ],
  template: `
    <div
      class="progress-container"
      cdkOverlayOrigin #trigger="cdkOverlayOrigin"
      (click)="isOpen.set(!isOpen()); onTouch()"
    >
      <div class="progress-fill" [style.width.%]="value()">
        {{ value() }}%
      </div>
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      (overlayOutsideClick)="isOpen.set(false)"
    >
      
      <div class="panel">
        <mat-slider>
          <input
            matSliderThumb
            [value]="value()"
            (valueChange)="valueChangeHandler($event)"
          >
        </mat-slider>
      </div>
    </ng-template>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => OverlayProgress), multi: true },
  ],
  styles: `
    .panel {
      border: 1px solid black;
      border-radius: 4rem;
      margin: 1rem 0;
    }
    .progress-container {
      cursor: pointer;
      width: 300px;
      max-width: 480px; /* Equivalent to max-w-md in Tailwind */
      background-color: #e2e8f0; /* Equivalent to bg-gray-200 */
      border-radius: 9999px; /* Equivalent to rounded-full */
      height: 32px; /* Equivalent to h-8 */
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* Equivalent to shadow-lg */
    }

    /* Styles for the progress bar fill */
    .progress-fill {
      background-color: #2563eb; /* Equivalent to bg-blue-600 */
      height: 100%;
      border-radius: 9999px; /* Equivalent to rounded-full */
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff; /* Equivalent to text-white */
      font-weight: bold; /* Equivalent to font-bold */
      font-size: 0.875rem; /* Equivalent to text-sm */
      transition: width 0.5s ease-out; /* Equivalent to transition-all duration-500 ease-out */
      width: 50%; /* Set the progress to 50% */
    }
  `
})
export class OverlayProgress implements ControlValueAccessor {
  value = signal(50)
  isOpen = signal(false);
  onChange!: (value: number) => void;
  onTouch!: () => void;

  writeValue(value: number): void {
    this.value.set(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


  valueChangeHandler(newValue: number) {
    this.onChange(newValue);
    this.onTouch();
    this.value.set(newValue)
  }

}
