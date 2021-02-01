import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FileUploadModule { }

