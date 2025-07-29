import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-demo-dnd',
  imports: [CdkDropList, CdkDrag, JsonPipe, MatIcon, CdkDragHandle],
  template: `
    
    <h1>Drag and Drop Demo</h1>
    
    <div cdkDropList class="list" (cdkDropListDropped)="drop($event)">
      @for (product of products(); track product.id) {
        <div class="item" cdkDrag>
          <mat-icon cdkDragHandle style="cursor: move;">drag_indicator</mat-icon>
          {{product.name}}
        </div>
      }
    </div>

    <br>
    <pre>{{this.products() | json}}</pre>
  `,
  styles: `

    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .item {
      background-color: lightgray;
      border-radius: 1rem;
      padding: 1rem;
      display: flex; /*NEW*/
      align-items: center;  /*NEW*/
      overflow: hidden; /*NEW*/
    }

    .cdk-drag-preview {
      border: 1px solid #ddd;
      background-color: white;
    }

    .cdk-drag-placeholder {
      opacity: 0.5;
    }

    /* animation when element is released */
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* animation during dragging */
    .list.cdk-drop-list-dragging .item:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

  `
})
export default class DemoDnd {
  products = signal([
    { id: 1, name: 'Nutella', position: 0 },
    { id: 2, name: 'Cake', position: 1 },
    { id: 3, name: 'Milk', position: 2 },
  ])

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products(), event.previousIndex, event.currentIndex);
    console.log(this.products())
    this.products.update(prev => {
      return prev.map((p, index) => ({...p, position: index}) )
    })
  }
}
