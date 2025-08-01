import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-remove-city',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  template: `
    <h2 mat-dialog-title>Delete City</h2>
    <mat-dialog-content>
      Would you like to delete this city?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close>No</button>
      <button matButton [mat-dialog-close]="true">Ok</button>
    </mat-dialog-actions>  
  `,
  styles: ``
})
export class DialogRemoveCity {

}
