import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {
  @Input() accept: string = '';
  @Input() maxSize: number=0;
  @Input() label: string='Cambiar';
  constructor(public events: EventsService) { }
  public error:string='';
  ngOnInit(): void {
  }

  handleUpload(event:any) {
    this.error=''
		const file = event.target.files[0];
		if(file){
      if((file.size/1024) > this.maxSize)
        this.error="El archivo es demasiado grande."
      if(this.error==''){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.events.publish('app-input-file', {
            base64: reader.result,
            name: file.name,
            size: file.size
          });
        };
      }
		}
	}

}
