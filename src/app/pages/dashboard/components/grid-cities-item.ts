import { httpResource } from '@angular/common/http';
import { Component, computed, effect, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { City } from '../../../model/city';

@Component({
  selector: 'app-grid-cities-item',
  imports: [
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem
  ],
  template: `
    <div>{{ city().name }}</div>
    <div class="flex justify-center gap-3 items-center">
      @if (meteo.isLoading()) {
        loading...
      }
      @if (meteo.error()) {
        <div class="bg-red-300 p-2 rounded-full mt-1">Error!</div>
      } @else {
        <div>{{ temperature() }} °</div>
        <img [src]="icon()" alt="meteo">  
      }
    </div>
    
    <div class="absolute top-0 right-0">
      <button
        mat-icon-button
        [matMenuTriggerFor]="menu"
      >
        <mat-icon>more_vert</mat-icon>
      </button>
    </div>
    
    <mat-menu #menu="matMenu">
      <button mat-menu-item (click)="onEdit.emit(city())">
        <mat-icon>edit</mat-icon>
        <span>Edit</span>
      </button>
      <button mat-menu-item (click)="onDelete.emit(city())">
        <mat-icon>delete</mat-icon>
        <span>delete</span>
      </button>
    </mat-menu>
    
  `,
  styles: ``
})
export class GridCitiesItem {
  city = input.required<City>()
  onDelete = output<City>()
  onEdit = output<City>()
  meteo = httpResource<Meteo>(() => `https://api.openweathermap.org/data/2.5/weather?q=${this.city().name}&units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534`)

  temperature = computed(() => this.meteo.value()?.main?.temp)
  icon = computed(() => {
    const icon = this.meteo.value()?.weather[0].icon;
    return `https://openweathermap.org/img/w/${icon}.png`
  })
}



export interface Meteo {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Coord {
  lon: number;
  lat: number;
}
