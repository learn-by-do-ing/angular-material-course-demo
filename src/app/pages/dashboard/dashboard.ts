import { JsonPipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { City } from '../../model/city';
import { DialogCity } from './components/dialog-city';
import { DialogRemoveCity } from './components/dialog-remove-city';
import { GridCities } from './components/grid-cities';

@Component({
  selector: 'app-dashboard',
  imports: [
    GridCities,
    MatIconButton,
    MatIcon,
    JsonPipe
  ],
  template: `
    <button
      mat-icon-button
      (click)="addCity()"
    >
      <mat-icon>add</mat-icon>
    </button>
    
    @if (cities.error()) {
      <div>Server is down</div>
      <div>Open your terminal and type <pre>npm run server</pre></div>
    } @else {
      <app-grid-cities
        [cities]="cities.value()"
        (onDelete)="deleteCity($event)"
        (onEdit)="editCity($event)"
        (onDrag)="dragCities($event)"
      ></app-grid-cities>  
    }
    

   
  `,
})
export default class Dashboard {
  cities = httpResource<City[]>(() => `http://localhost:3000/cities?_sort=position`)
  http = inject(HttpClient)
  dialog = inject(MatDialog); // NEW
  snackBar = inject(MatSnackBar);

  addCity() {
    const dialog = this.dialog.open(DialogCity, {
      width: '300px',
      data: { name: '', type: 'add' }
    });
    dialog.afterClosed().subscribe(cityName => {
      if (cityName) {
        this.http.post<City>('http://localhost:3000/cities', {
          name: cityName,
          position: this.cities.value()?.length
        })
          .subscribe(() => {
            this.cities.reload()
          })
      }
    })
  }

  deleteCity(city: City) {
    const dialog = this.dialog.open(DialogRemoveCity, {
      width: '250px',
    });
    dialog.afterClosed().subscribe((confirm) => {
      console.log(confirm)
      if (confirm) {
        this.http.delete<City>(`http://localhost:3000/cities/${city.id}`)
          .subscribe(() => {
            this.cities.reload()
            this.snackBar.open('City Removed', 'ALERT', { duration: 1000});
          })
      }
    })
  }

  editCity(city: City) {
    const dialog = this.dialog.open(DialogCity, {
      width: '300px',
      data: { name: city.name, type: 'edit' }
    });
    dialog.afterClosed().subscribe((newName) => {
      if (newName) {
        this.http.patch<City>(`http://localhost:3000/cities/${city.id}`, { name: newName })
          .subscribe(() => {
            this.cities.reload()
            this.snackBar.open('City Updated', 'ALERT', { duration: 1000});
          })
      }
    })

  }

  dragCities(cities: City[]) {
    console.log(cities);

    const citiesObservables = cities.map((city, index) =>
      // this.update(project.id, { name: project.name, position: index })
      this.http.patch<City>(`http://localhost:3000/cities/${city.id}`, {
        name: city.name, position: index
      })
    );

    forkJoin(citiesObservables).subscribe((results) => {
      this.snackBar.open('City Sorted', 'ALERT', { duration: 1000});
    });
  }
}
