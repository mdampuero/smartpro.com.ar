import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogsService } from 'src/app/services/api/logs.service';
import { EventsService } from 'src/app/services/events.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  public data:any;
  public closeResult = '';
  @Input() resource: string = "";
  public form={
    user:'',
    icon:'',
    status:'',
    resource:'',
    description:''
  }

  constructor(private spinner: NgxSpinnerService,
    public logsService: LogsService,
    public events: EventsService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar) { 

    }

  ngOnInit(): void {
    this.getResult();
  }

  getResult(){
    this.spinner.show();
    this.logsService.getByResource(this.resource).subscribe(
      (data:any) =>this.data=data,
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }  

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  save(){
    this.form.user='Usuario';
    this.form.icon='fa fa-pencil';
    this.form.status='info';
    this.form.resource=this.resource;
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    this.logsService.save(this.form).subscribe(
      (data:any) => {
        this.form.description='';
        this.data=data;
        this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
        this.modalService.dismissAll();
      },
      (error) => {
        if(error.status==400)
          Object.entries(error.error.form.errors.children).forEach(
            ([key, value]) => this.callback(key,value)
          );
        this.spinner.hide();
      },
      ()=>this.spinner.hide()
    );
  }
  callback(key:string,errors:any){
    if(typeof errors.errors != "undefined")
      $("[name='"+key+"']").after('<small class="form-control-feedback text-danger">'+errors.errors[0]+'</small>');
  }

  private getDismissReason(reason: any): string {
    return '';
  }
}
