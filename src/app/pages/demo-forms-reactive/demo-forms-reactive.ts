import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule, FormBuilder,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-demo-forms-reactive',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, JsonPipe, MatSelectModule, MatCheckbox, MatRadioGroup, MatRadioButton, MatButton
  ],
  template: `
    
    <h1>Reactive Forms</h1>
    <form 
      [formGroup]="form" (submit)="send()"
      class="flex flex-col gap-3 w-96 mx-auto"
    >

      <mat-form-field>
        <mat-label>name</mat-label>
        <input type="text" matInput
               formControlName="name"
               placeholder="Your name (ex. Fabio Biondi)">
        <mat-hint>Required Field</mat-hint>
        @if (form.get('name')?.hasError('required')) {
          <mat-error>Please enter your name</mat-error>
        }
      </mat-form-field>


      @let email = form.get('email');
      
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input type="email" matInput 
               formControlName="email"
               placeholder="Ex. pat@example.com">
        <mat-hint>Enter a valid email address</mat-hint>
        @if (email?.hasError('email') && !email?.hasError('required')) {
          <mat-error>Please enter a valid email address</mat-error>
        }
        @if (email?.hasError('required')) {
          <mat-error>Email is <strong>required</strong></mat-error>
        }
      </mat-form-field>

      @let topics = form.get('topics');
      <mat-form-field>
        <mat-label>Favorite Topics</mat-label>
        <mat-select formControlName="topics" multiple>
          @for (topic of topicsList; track topic) {
            <mat-option [value]="topic">{{topic}}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Message</mat-label>
        <textarea matInput formControlName="message"></textarea>
      </mat-form-field>

      <label id="example-radio-group-label">Your Job</label>

      <mat-radio-group aria-label="Select an Job" formControlName="job">
        <mat-radio-button value="DES">Designer</mat-radio-button>
        <mat-radio-button value="DEV">Developer</mat-radio-button>
        <mat-radio-button value="OTH">Other</mat-radio-button>
      </mat-radio-group>

      <mat-checkbox formControlName="subscribe">Subscribe Newsletter</mat-checkbox>
      
      <button mat-stroked-button type="submit">SEND</button>
      <pre>{{form.value | json}}</pre>
    </form>

  `,
  styles: ``
})
export default class DemoFormsReactive {
  fb = inject(FormBuilder)
  topicsList: string[] = ['FrontEnd', 'BackEnd', 'UI / UX', 'Marketing', 'AI'];

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    topics: '',
    message: '',
    job: '',
    subscribe: false
  })

  send() {
    console.log(this.form.value)
  }
}
