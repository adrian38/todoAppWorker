import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  direccion: string = 'Calle General Aguirre #561 entre calle General Emilio Nunez y calle Marta Abreu, Cerro, La Habana';

  constructor() { }

  ngOnInit() {
  }

}
