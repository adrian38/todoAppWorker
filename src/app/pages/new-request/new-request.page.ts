import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
})
export class NewRequestPage implements OnInit {

  @Input() category: string = 'FONTANERIA';
  @Input() photos: any [] = [1, 1];

  constructor() { }

  ngOnInit() {
  }

  onCloseClick( event ) {
    console.log('Close clicked');
  }

  onNextClick( event ) {
    console.log('Next clicked');
  }
}
