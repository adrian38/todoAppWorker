import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {

  avatarusuario:string =""; 

  constructor() { }

  ngOnInit() {
    this.avatarusuario =  '../../../assets/registro.svg'
  }

}

