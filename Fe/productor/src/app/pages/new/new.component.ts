import { Component, OnInit } from '@angular/core';
import { ProvencesService } from 'src/app/services/api/provences.service';
import { LocalitiesService } from 'src/app/services/api/localities.service';
import { CompaniesService } from 'src/app/services/api/companies.service';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})




export class NewComponent implements OnInit {
  public loadingLocalities=false;
  public datePicker:any;
  public form: any={
    id:'',
    number:'',
    amount:'',
    amountRepeat:'',
    date:'',
    productor:'',
    company:'',
    name:'',
    document:'',
    email:'',
    phone:'',
    observations:'',
    provence:'',
    locality:'',
    street:'',
    streetNumber:'',
    department:'',
    postalCode:'',
    floor:''
  };
  public companies: any[]=[];
  public provences: any[]=[];
  public localities: any[]=[];
  constructor(
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public companiesService: CompaniesService,
    public provencesService: ProvencesService,
    public localitiesService: LocalitiesService,
    public sinistersService: SinistersService) { 
    this.loadForm();
  }

  ngOnInit(): void {
  }

  loadForm(){
    this.companiesService.getAll().subscribe((data:any) => this.companies=data.data);
    this.provencesService.getAll().subscribe((data:any) => this.provences=data.data);
  }

  onChange() {
    this.loadingLocalities=true;
    this.form.locality='';
    this.localitiesService.getByProvence(this.form.provence).subscribe((data:any) => {
      this.localities=data;
      this.loadingLocalities=false;
    });
  }

  save(form:NgForm){
    this.spinner.show();
    $(".error.text-danger").remove();
    if(this.datePicker)
      this.form.date=this.datePicker.format('YYYY-MM-DD');
    this.sinistersService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 4000 });
        this.router.navigate(['/']);
      },
      (error) => {
        if(error.status==400)
          Object.entries(error.error.form.errors.children).forEach(
            ([key, value]) => this.callback(key,value)
          );
        this._snackBar.open('Ocurrió un error, por favor revise el formulario','Aceptar', { duration: 4000 });
        this.spinner.hide();
      }
    );
  }
  callback(key:string,errors:any){
    if(typeof errors.errors != "undefined")
      $("[name='"+key+"']").after('<div class="error text-danger">'+errors.errors[0]+'</div>');
  }

}
