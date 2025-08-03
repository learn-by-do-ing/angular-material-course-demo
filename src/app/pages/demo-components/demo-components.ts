import { Component } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-demo-components',
  imports: [MatCardModule, MatButton, MatIconButton, MatIcon, MatProgressBar, MatTabGroup, MatTab, MatTooltip, MatToolbar],
  template: `
    <mat-toolbar>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <mat-icon>menu</mat-icon>
      </button>
      <span>My App</span>
      <span class="example-spacer"></span>
      <button mat-icon-button class="example-icon favorite-icon" aria-label="Example icon-button with heart icon">
        <mat-icon>favorite</mat-icon>
      </button>
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with share icon">
        <mat-icon>share</mat-icon>
      </button>
    </mat-toolbar>

    <button mat-icon-button matTooltip="Go to Home">
      <mat-icon aria-hidden="false" aria-label="Example home icon" fontIcon="home"></mat-icon>
    </button>

    <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    
    <div class="my-16">
      <mat-tab-group>
        <mat-tab label="First"> Content 1 </mat-tab>
        <mat-tab label="Second"> Content 2 </mat-tab>
        <mat-tab label="Third"> Content 3 </mat-tab>
      </mat-tab-group>
    </div>

    <!--CARD-->
    <mat-card class="example-card" appearance="outlined">
      <mat-card-header>
        <div mat-card-avatar class="example-header-image"></div>
        <mat-card-title>Shiba Inu</mat-card-title>
        <mat-card-subtitle>Dog Breed</mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image src="https://material.angular.dev/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
      <mat-card-content>
        <p>
          The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
          A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
          bred for hunting.
        </p>
      </mat-card-content>
      <mat-card-actions>
        <button matButton>LIKE</button>
        <button matButton>SHARE</button>
      </mat-card-actions>
    </mat-card>

  `,
  styles: `
    .example-spacer {
      flex: 1 1 auto;
    }
  
  `
})
export default class DemoComponents {

}
