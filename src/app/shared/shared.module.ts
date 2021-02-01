import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule, 
    MatTableModule  
  ],
  exports:[
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,   
    MatProgressBarModule,
    MatTableModule
    
  ]
})
export class SharedModule { }
