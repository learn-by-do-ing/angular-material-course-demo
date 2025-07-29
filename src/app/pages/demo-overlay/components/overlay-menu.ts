import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, input, output, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-overlay-menu',
  imports: [
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    MatButton
  ],
  template: `
    <button
      mat-button
      (click)="isOpen.set(!isOpen())" type="button" 
      cdkOverlayOrigin #trigger="cdkOverlayOrigin"
    >
      {{isOpen() ? "Close" : "Open"}}
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen()"
      (overlayOutsideClick)="isOpen.set(false)"
    >
      <ul class="list">
        @for (item of items(); track $index) {
          <li (click)="itemClickHandler(item)">{{ item }}</li>
        }
      </ul>
    </ng-template>
  `,
  styles: `
    .list {
      width: 100px;
      border: solid 1px #ccc;
      border-radius: 5px;
      background: #fff;
      text-align: center;
      padding: 10px;
      margin: 0;
    }

    .list > li {
      list-style-type: none;
      border-bottom: solid 1px #8b8b8b;
      padding: 8px 0;
      cursor: pointer;
    }

    .list > li:last-child {
      border-bottom: none;
    }
  
  `
})
export class OverlayMenu {
  items = input<string[]>([]);
  onItemClick = output<string>()
  isOpen = signal(false);

  itemClickHandler(item: string) {
    this.onItemClick.emit(item)
    this.isOpen.set(false)
  }
}
