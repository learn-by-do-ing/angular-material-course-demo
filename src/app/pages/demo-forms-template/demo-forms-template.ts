import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-demo-forms-template',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, JsonPipe, MatSelectModule, MatCheckbox, MatRadioGroup, MatRadioButton, MatButton
  ],
  template: `
    <h1>Template Driven Forms</h1>
    
    <form
      #form="ngForm"
      (submit)="send(form)"
      class="flex flex-col gap-3 w-96 mx-auto"
    >

      <mat-form-field>
        <mat-label>name</mat-label>
        <input type="text" matInput
               ngModel name="name"
               #nameInput="ngModel"
               placeholder="Your name (ex. Fabio Biondi)">
        <mat-hint>Required Field</mat-hint>
        @if (nameInput?.hasError('required')) {
          <mat-error>Please enter your name</mat-error>
        }
      </mat-form-field>


      
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="email" matInput
               ngModel name="email"
               #emailInput="ngModel"
               placeholder="Ex. pat@example.com">
        <mat-hint>Enter a valid email address</mat-hint>
        @if (emailInput?.hasError('email') && !emailInput?.hasError('required')) {
          <mat-error>Please enter a valid email address</mat-error>
        }
        @if (emailInput?.hasError('required')) {
          <mat-error>Email is <strong>required</strong></mat-error>
        }
      </mat-form-field>

      <mat-form-field>
        <mat-label>Favorite Topics</mat-label>
        <mat-select
          ngModel name="topics"
          multiple>
          @for (topic of topicsList; track topic) {
            <mat-option [value]="topic">{{topic}}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Message</mat-label>
        <textarea matInput
                  ngModel name="message"></textarea>
      </mat-form-field>

      <label id="example-radio-group-label">Your Job</label>

      <mat-radio-group 
        aria-label="Select an Job"
        ngModel name="job">
        <mat-radio-button value="DES">Designer</mat-radio-button>
        <mat-radio-button value="DEV">Developer</mat-radio-button>
        <mat-radio-button value="OTH">Other</mat-radio-button>
      </mat-radio-group>

      <mat-checkbox
        ngModel name="subscribe"
      >Subscribe Newsletter</mat-checkbox>
      
      <button mat-flat-button class="accent" type="submit">SEND</button>
      <pre>{{form.value | json}}</pre>
    </form>

  `,
  styles: ``
})
export default class DemoFormsTemplate {
  topicsList: string[] = ['FrontEnd', 'BackEnd', 'UI / UX', 'Marketing', 'AI'];

  send(form: NgForm) {
    console.log(form.value)
  }
}
