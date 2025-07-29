import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-city',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule
  ],
  template: `
      <h2 mat-dialog-title>
      {{data.type === 'edit' ? 'Edit' : 'Add'}} City
    </h2>
    <mat-dialog-content>
      <mat-form-field class="example-form-field">
        <mat-label>City Name</mat-label>
        <input 
          matInput
          cdkFocusInitial
          (keydown.enter)="dialogRef.close(this.data.name)"
          type="text" [(ngModel)]="data.name"
        >
        @if (data.name) {
          <button type="button" matSuffix matIconButton aria-label="Clear"
                  (click)="data.name=''">
            <mat-icon>close</mat-icon>
          </button>
        }
      </mat-form-field>

    </mat-dialog-content>
    <mat-dialog-actions>
      <button type="button" matButton mat-dialog-close>Cancel</button>
      <button type="submit" matButton [mat-dialog-close]="data.name">Save</button>
    </mat-dialog-actions>
  `,
  styles: ``
})
export class DialogCity {
  data = inject<{ name: string, type: 'add' | 'edit' }>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DialogCity>);

}
