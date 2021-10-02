import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-picture',
  templateUrl: './card-picture.component.html',
  styleUrls: ['./card-picture.component.css']
})
export class CardPictureComponent implements OnInit {
  @Input() path: string = "";
  @Input() title: string = "";
  @Input() subtitle: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
