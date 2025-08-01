import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatIcon, Navbar],
  template: `
    <mat-sidenav-container>
        <mat-sidenav #sidenav mode="side" [fixedInViewport]="true" >
          <app-navbar />
        </mat-sidenav>

      <div class="mx-3">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>list</mat-icon>
        </button>
        
        <div>
        <router-outlet />
        </div>
      </div>

    </mat-sidenav-container>
  `,
})
export class App {
}
