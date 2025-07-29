import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayMenu } from './components/overlay-menu';
import { OverlayProgress } from './components/overlay-progress';

@Component({
  selector: 'app-demo-overlay',
  imports: [
    OverlayMenu,
    OverlayProgress,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <h1>Overlay: popover menu</h1>
    <app-overlay-menu
      [items]="['one', 'two', 'three']"
      (onItemClick)="doSomething($event)"
    />
    
    <br>
    <br>
    <h1>Overlay: popover progress/slider</h1>
    <h2>Reactive Forms</h2>
    <pre>value: {{myInput.value}}</pre>
    <pre>dirty: {{myInput.dirty}}</pre>
    <pre>touched: {{myInput.touched}}</pre>
    <app-overlay-progress [formControl]="myInput" />
    
    <h2>Template Driven Forms</h2>
    <app-overlay-progress [(ngModel)]="value" /> {{value()}}
    
  `,

})
export default class DemoOverlay {
  value = signal(33)

  myInput = new FormControl(45)

  doSomething(item: string) {
    console.log('doSomething', item)
  }

  doSomethingWithProgressValue(item: number) {
    console.log('doSomethingWithProgressValue', item)
  }
}
