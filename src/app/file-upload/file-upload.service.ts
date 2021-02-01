import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { FileUploadDetails } from './file-upload-details';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  
  constructor(private httpClient:HttpClient) { }

  uploadFile(formData:any){

    return this.httpClient
      .post<any>("http://localhost:8080/api/csv/upload", formData, {
        reportProgress: true,
        observe: 'events'
    });
    // this.httpClient
    //     .post("http://localhost:8080/api/csv/upload", formData, {
    //       reportProgress: true,
    //       observe: 'events'
    // })
    // .pipe(map((event:any) => {
    //   switch (event.type) {
    //     case HttpEventType.Sent:
    //       console.log('Request has been made!');
    //       break;
    //     case HttpEventType.ResponseHeader:
    //       //console.log('Response header has been received! Status: {}', event.status);
    //       break;
    //     case HttpEventType.UploadProgress:
    //       var progress = Math.round(100 * event.loaded / event.total);
    //       console.log(`upload progress: ${progress}%`);
    //       break;
    //     case HttpEventType.Response:
    //       console.log('File successfully uploaded!', event.body);
    //       return event.body;
    //   }
    // }),
    // catchError((error: HttpErrorResponse) => {  
    //   file.inProgress = false;  
    //   console.log('Catch Error  ',error);
    //   throw error;
    // }))
  }

}
