import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, MatIcon, MatList, MatListItem, RouterLink, RouterLinkActive],
  template: `
    <mat-sidenav-container>
        <mat-sidenav #sidenav mode="side" [fixedInViewport]="true" >
          <mat-list>
            <mat-list-item routerLink="home" routerLinkActive="opacity-50">
              Home
            </mat-list-item>
            <mat-list-item routerLink="demo" routerLinkActive="opacity-50">
              Demo
            </mat-list-item>
            <mat-list-item routerLink="dashboard" routerLinkActive="opacity-50">
              Dashboard
            </mat-list-item>
          </mat-list>
        </mat-sidenav>

      <div class="">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>list</mat-icon>
        </button>
        
        <router-outlet />
      </div>

    </mat-sidenav-container>
  `,
})
export class App {
}
