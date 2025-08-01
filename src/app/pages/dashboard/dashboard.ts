import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { forkJoin } from 'rxjs';
import { City } from '../../model/city';
import { DialogCityForm } from './components/dialog-city-form';
import { DialogRemoveCity } from './components/dialog-remove-city';
import { GridCities } from './components/grid-cities';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard</h1>
    @if (cities.isLoading()) {
      <div>Loading...</div>
    }
    @if (cities.error()) {
      <div>Some errors!</div>
    }

    <button
      mat-icon-button (click)="addCity()"
      matTooltip="Add new City"
    >
      <mat-icon>add</mat-icon>
    </button>

    <app-grid-cities
      [cities]="cities.value()"
      (onDelete)="deleteCity($event)"
      (onEdit)="editCity($event)"
      (onDrag)="dragCities($event)"
    />
  `,
  imports: [
    GridCities,
    MatIconButton,
    MatIcon,
    MatTooltip
  ],
  styles: ``
})
export default class Dashboard {
  cities = httpResource<City[]>(() => `http://localhost:3000/cities?_sort=position`)
  http = inject(HttpClient)
  dialog = inject(MatDialog)
  snackbar = inject(MatSnackBar)

  addCity() {
    const dialogRef = this.dialog.open(DialogCityForm, {
      width: '300px',
      data: { name: '', type: 'add' },
    })

    dialogRef.afterClosed().subscribe(cityName => {
      if(cityName) {
        this.http.post(`http://localhost:3000/cities`, {
          name: cityName,
          position: this.getMaxPosition(this.cities.value()) + 1
        })
          .subscribe(() => {
            this.cities.reload()
            this.snackbar.open('Element ADded', 'success', { horizontalPosition: 'end', duration: 1000})
          })
      }
    })
  }

  editCity(city: City) {
    console.log(city)
    const dialogRef = this.dialog.open(DialogCityForm, {
      width: '300px',
      data: { name: city.name, type: 'edit' },
    })

    dialogRef.afterClosed().subscribe(cityName => {
      if(cityName) {
        this.http.patch(`http://localhost:3000/cities/${city.id}`, {
          name: cityName
        })
          .subscribe(() => {
            this.cities.reload()
            this.snackbar.open('City Updated', 'success', { horizontalPosition: 'end', duration: 1000})
          })
      }
    })

  }


  deleteCity(city: City) {
    const dialogRef = this.dialog.open(DialogRemoveCity, {
      width: '250px'
    })
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.http.delete(`http://localhost:3000/cities/${city.id}`)
          .subscribe(() => {
            this.snackbar.open('Element Removed', 'success', { horizontalPosition: 'end', duration: 1000})
            this.cities.reload()
          })
      }
    })
  }

  dragCities(cities: City[]) {
    console.log(cities)
    const citiesObservables = cities.map((city, index) => {
      return this.http.patch(`http://localhost:3000/cities/${city.id}`, {
        name: city.name,
        position: index
      })
    })

    forkJoin(citiesObservables)
      .subscribe(() => {
        this.cities.reload()
        //   window.alert('done')
      })
  }

  getMaxPosition(cities: City[] = []) {
    if (!Array.isArray(cities) || cities.length === 0) {
      return -1; // Nessun elemento
    }

    return Math.max(...cities.map(city => city.position ?? -1));
  }

}
