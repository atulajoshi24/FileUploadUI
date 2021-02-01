import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileUploadDetails } from './file-upload-details';
import { FileUploadService } from './file-upload.service';
import { FileUploadResponse, FileUploadError } from './file-upload-response';
import { map, catchError } from 'rxjs/operators';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @ViewChild("fileInput", { static: true })
  fileInput!: ElementRef;

  displayedColumns: string[] = ['FileName'];
  fileUploadResponse:FileUploadResponse;
  successMessage:string = 'File Uploaded Successfully';
  failureMessage:string = 'Failure In File Upload';
  allowedFileTypes = ['csv'];
  fileUploadProgress:number;
  uploadedFiles:FileUploadDetails[];
  dataSource : MatTableDataSource<FileUploadDetails>;

  constructor(private fileUploadService:FileUploadService) {   
     this.fileUploadResponse = {
      'success':true,
      'message':'',
      'errors':[],
    };
    this.uploadedFiles = [];
    this.fileUploadProgress = 0;
    this.dataSource = new MatTableDataSource<FileUploadDetails>();
  }


  initFileUploadResponseDetails(){
    this.fileUploadProgress = 0;
    this.fileUploadResponse = {
      'success':true,
      'message':'',
      'errors':[],
    };
  }

  ngOnInit(): void {
    this.fileUploadProgress = 0;
    this.fileUploadResponse = {
      'success':true,
      'message':'',
      'errors':[],
    };
    this.uploadedFiles = [];
    this.dataSource = new MatTableDataSource<FileUploadDetails>();
  }

  openFileDialog() {  

    this.initFileUploadResponseDetails();
    const fileInput = this.fileInput.nativeElement;
    fileInput.onchange = () => {         
        const file = fileInput.files[0]; 
        const valid = this.validateFile(file);
        if(valid){
          const fileToUpload:FileUploadDetails= {
            "data": file, 
            "inProgress": false, 
            "progress": 0
          };
          //this.uploadFile({ data: file, inProgress: false, progress: 0});  
          this.uploadFile(fileToUpload);  
        }else{
          this.fileUploadResponse = {
            'success':false,
            'message':'',
            'errors': [{
              'code':'',
              'message': 'Only CSV file Type Is Allowed'
            }]
         };    
        }
    };  
    fileInput.click();  
  }

  uploadFile(file:FileUploadDetails){

    console.log("file ",file);
    const formData = new FormData();  
    formData.append('file', file.data);  
    file.inProgress = true;   
    this.fileUploadService.uploadFile(formData).pipe(  
      map((event:any) => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);
            this.fileUploadProgress = file.progress;
            console.log('file.progress = ',file.progress);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;
        console.log("HttpErrorResponse ",error);   
        console.log('Subscribe Error  ',error.error.errors)
        this.fileUploadResponse = {
           'success':false,
           'message':this.failureMessage + ' '+file.data.name,
           'errors': this.getFileUploadErrors(error)
        };  
        this.fileInput.nativeElement.value = '';           
        return EMPTY;       
      }))
      .subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log("succecss handler ",event.body);  
          const response = event.body;
          if(response){
            console.log('Response ',response)
            this.fileUploadResponse = {
              'success':response.success,
              'message': file.data.name + ' ' +this.successMessage,
              'errors':[]
            };
            this.uploadedFiles.push(file);
            this.dataSource = new MatTableDataSource<FileUploadDetails>(this.uploadedFiles);          
            this.fileInput.nativeElement.value = '';
          }  
        }  
      }); 
    // this.fileUploadService.uploadFile(file).subscribe(
     
    //   (response) => {
    //     if(response){
    //       console.log('Response ',response)
    //       this.apiResponse = {
    //         'success':response.success,
    //         'message':this.successMessage,
    //         'errors':[]
    //       };
    //     }  
    //   },
    //   (err) => {
    //     console.log('Subscribe Error  ',err.error.errors)
    //     this.apiResponse = {
    //       'success':false,
    //       'message':this.failureMessage,
    //       'errors':err.error.errors
    //     };    
    //   },
    //   () => console.log('Completed !!')
    //  );
  }

  getFileUploadErrors(error: HttpErrorResponse){

    let errors:any= [];
    if(error.error.errors){
      errors = error.error.errors.map((err:any) => {
        return{ 
          'code':err.code,
          'message': err.message,
        }
     })
     return errors;
    } else{
      return errors;
    }
  
  }

  validateFile(file:any):boolean{

    const filenameArr = file.name.split('.'); // split filename into array
    const ext:string = filenameArr.pop(); // keep last element as the file extension
    let validUpload = true;
    if (filenameArr.length > 0 && 
      this.allowedFileTypes.indexOf(ext.toLowerCase()) < 0) {
      validUpload = false;
    }

    return validUpload;

  }

}
