import { httpResource } from '@angular/common/http';
import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBar } from '@angular/material/progress-bar';
import { City } from '../../../model/city';

@Component({
  selector: 'app-grid-cities-item',
  imports: [
    MatIconButton,
    MatButtonModule, MatMenuModule, MatIconModule, MatProgressBar
  ],
  template: `
    
    <div class="p-4">{{city().name}} </div>
    
    @if(meteo.isLoading()) {
      <mat-progress-bar mode="indeterminate" />
    }
    <div class="flex items-center justify-center gap-2">
      
      @if(meteo.error()) {
        <div class="bg-red-300 p-2 rounded-full">error!</div>
      } @else {
        <div class="text-3xl">{{temperature()}} °</div>
        <img [src]="icon()" alt="">  
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
        <span>Delete</span>
      </button>
    </mat-menu>
    
  `,
})
export class GridCitiesItem {
  city = input.required<City>()
  onDelete = output<City>()
  onEdit = output<City>()

  meteo = httpResource<Meteo>(() => `https://api.openweathermap.org/data/2.5/weather?q=${this.city().name}&units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534`)
  temperature = computed(() => {
    return this.meteo.value()?.main.temp
  })

  icon = computed(() => {
    const icon = this.meteo.value()?.weather[0].icon;
    return `https://openweathermap.org/img/w/${icon}.png`
  })
}

/*METEO TYPE*/

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
