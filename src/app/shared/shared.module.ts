import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,   
  ],
  exports:[
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,   
    MatProgressBarModule
    
  ]
})
export class SharedModule { }
