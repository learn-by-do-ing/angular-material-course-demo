import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-demo-dnd',
  imports: [CdkDropList, CdkDrag, JsonPipe, MatIcon, CdkDragHandle],
  template: `
    <h1>Drag And Drop Demo</h1>
    <div
      cdkDropList
      class="list"
      (cdkDropListDropped)="drop($event)"
    >
      @for (product of products(); track product.id) {
        <div class="item" cdkDrag>
          <mat-icon cdkDragHandle style="cursor: move">drag_indicator</mat-icon>
          {{product.name}}
        </div>
      }
    </div>

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
      display: flex;
      align-items: center;
      gap: 1rem;
      overflow: hidden;
    }
    
    .cdk-drag-preview {
      border: 1px solid black;
      background-color: white;
    }
    
    .cdk-drag-placeholder {
      opacity: 0.2;
      
    }
    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    
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

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.products(), event.previousIndex, event.currentIndex)
    this.products.update(prev => {
      return prev.map((p, i) => ({ ...p, position: i }))
    })
  }
}
