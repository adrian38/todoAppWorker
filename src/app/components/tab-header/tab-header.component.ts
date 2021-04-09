import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
})
export class TabHeaderComponent implements OnInit {

  @Input() titulo: string;
  @Input() backgroundColor: string = '';

  constructor() { }

  ngOnInit() {
    const elemento = document.getElementById('div_back');

    if(this.backgroundColor !== ''){
      elemento.style.backgroundColor = this.backgroundColor;
    }
  }
}
