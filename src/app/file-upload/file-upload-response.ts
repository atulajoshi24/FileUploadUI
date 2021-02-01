export interface FileUploadResponse {

    success :boolean,
    message :string,
    errors:FileUploadError[]
}

export interface FileUploadError{
    code:string,
    message:string
}


