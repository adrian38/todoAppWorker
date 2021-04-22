import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios-historial',
  templateUrl: './servicios-historial.page.html',
  styleUrls: ['./servicios-historial.page.scss'],
})
export class ServiciosHistorialPage implements OnInit {

  fecha: string;
  horario: string;
  direccion: string;
  fotos: string [];
  nombreCliente: string;

  constructor() { }

  ngOnInit() {
    this.fecha = 'Miércoles, 9 de Septiembre de 2020';
    this.horario = 'De 09:00 am a 10:00 am';
    this.direccion = 'Calle 52 #1701 e/ 19 y 17, Playa';
    this.nombreCliente = 'Lisniel Sanchez'
  }

}
