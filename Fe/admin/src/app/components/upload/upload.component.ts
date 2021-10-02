import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/services/api/upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: any[]=[] ;
  progressInfos = [{value:0,fileName:""}];
  message = '';

  fileInfos: Observable<any> | null = null;

  constructor(private uploadService: UploadService,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    //this.fileInfos = this.uploadService.getFiles();
  }

  selectFiles(e: any): void {
    this.progressInfos = [];
    
  }

  handleUpload(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
    };
  }
  
  uploadFiles(e: any): void {
    this.spinner.show();
    this.message = '';
    this.selectedFiles = e.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(event.loaded);
          //this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          //this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file:' + file.name;
      });
  }

}
