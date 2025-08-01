import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-dialog-city-form',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule,
    MatFormField,
    MatLabel,
    MatInput,
  ],
  template: `
    <h2 mat-dialog-title>
      {{data.type === 'edit' ? 'Update' : 'Add'}} City
    </h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>City Name</mat-label>
        <input 
          matInput
          type="text"
          [(ngModel)]="data.name"
          cdkFocusInitial
          (keydown.enter)="dialogRef.close(data.name)"
        >
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton mat-dialog-close>Cancel</button>
      <button matButton [mat-dialog-close]="data.name" >Save</button>
    </mat-dialog-actions>
  `,
  styles: ``
})
export class DialogCityForm {
  data = inject<{ name: string, type: 'add' | 'edit' }>(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<DialogCityForm>)
}
