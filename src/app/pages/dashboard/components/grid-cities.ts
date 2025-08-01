import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, input, output } from '@angular/core';
import { City } from '../../../model/city';
import { GridCitiesItem } from './grid-cities-item';

@Component({
  selector: 'app-grid-cities',
  imports: [CdkDropList, CdkDrag, GridCitiesItem],
  template: `
    <div cdkDropList cdkDropListOrientation="mixed" class="example-list" 
         (cdkDropListDropped)="drop($event)">
      @for (city of cities(); track city.id) {
        <div class="example-box relative" cdkDrag>
          <app-grid-cities-item
            [city]="city"
            (onEdit)="editCity($event)"
            (onDelete)="onDelete.emit($event)"
          />
        </div>
      }
    </div>
  `,
  styles: `
    .example-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      max-width: 100%;
      gap: 15px;
      padding: 15px;
      border: solid 1px #ccc;
      min-height: 60px;
      border-radius: 4px;
      overflow: hidden;
    }

    .example-box {
      width: 200px; /*NEW*/
      padding: 20px 10px;
      border: solid 1px #ccc;
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.87);
      display: inline-block;
      box-sizing: border-box;
      cursor: move;
      background: white;
      text-align: center;
      font-size: 14px;
      overflow: hidden;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `
})
export class GridCities {
  cities = input<City[] | undefined>([])
  onDelete = output<City>()
  onEdit = output<City>()
  onDrag = output<City[]>()

  editCity(city: City) {
    this.onEdit.emit(city)
  }
  drop(event: CdkDragDrop<City[]>) {
    const cities = this.cities()
    if (cities) {
      moveItemInArray(cities, event.previousIndex, event.currentIndex);
      this.onDrag.emit(cities)
    }
  }
}
