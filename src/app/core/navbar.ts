import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatList,
    MatListItem,
    RouterLinkActive
  ],
  template: `
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
      <mat-list-item routerLink="demo-dnd" routerLinkActive="opacity-50">
        Demo Drag and Drop
      </mat-list-item>
      <mat-list-item routerLink="demo-overlay" routerLinkActive="opacity-50">
        Demo Overlay
      </mat-list-item>
    </mat-list>
  `,
  styles: ``
})
export class Navbar {

}
