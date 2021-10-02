import { Component, Input, OnInit } from '@angular/core';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-thumbnail-picture',
  templateUrl: './thumbnail-picture.component.html',
  styleUrls: ['./thumbnail-picture.component.css']
})
export class ThumbnailPictureComponent implements OnInit {
  @Input() path: string = "";
  public environment=environment;
  constructor() { }

  ngOnInit(): void {
  }

}
