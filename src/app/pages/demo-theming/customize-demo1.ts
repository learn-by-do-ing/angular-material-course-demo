import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-customize-demo1',
  imports: [
    MatBadge,
    MatButton
  ],
  template: `
    <span matBadge="4" matBadgeOverlap="false" style="margin-top:24px">Text with a badge</span>
    
    <br>
    <br>
    <button matButton>click</button>
    <button mat-stroked-button color="primary">primary</button>
    <button mat-stroked-button class="accent">accent</button>
    <button mat-stroked-button  class="error">error</button>
 
    <button mat-flat-button>primary</button>
    <button mat-flat-button class="accent">accent</button>
    <button mat-flat-button  class="error">error</button>
    
    <button mat-raised-button>primary</button>
    <button mat-raised-button  class="accent">accent</button>
    <button mat-raised-button  class="error">error</button>
  `,
  styles: `
  
  `
})
export default class CustomizeDemo1 {

}
