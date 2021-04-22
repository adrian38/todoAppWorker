import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/Interfaces/interfaces';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  task: TaskModel;
  contratadosList: TaskModel[];

  contratados: Servicio[] = [
    {
      titulo: 'Fontaneria',
      fechaInicio: "08.09.2020",
      fechaFin: 'Mié. 9 sep. 2020',
      horario: '09:00 am',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '1010 €'
    }
   /*  {
      titulo: 'Fontaneria',
      fechaInicio: "08.09.2020",
      fechaFin: 'Mié. 9 sep. 2020',
      horario: '09:00 am-10:00 am',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '20€'
    },
    {
      titulo: 'Fontaneria',
      fechaInicio: "08.09.2020",
      fechaFin: 'Mié. 9 sep. 2020',
      horario: '09:00 am-10:00 am',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '20€'
    },
    {
      titulo: 'Fontaneria',
      fechaInicio: "08.09.2020",
      fechaFin: 'Mié. 9 sep. 2020',
      horario: '09:00 am-10:00 am',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '20€'
    } */
  ];

  historial: Servicio[] = [
    {
      titulo: 'Fontaneria',
      fechaInicio: "12.08.2021",
      fechaFin: 'Mié. 9 sep. 2021',
      horario: '11:00 am-10:00 pm',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '35€'
    },
    {
      titulo: 'Fontaneria',
      fechaInicio: "12.08.2021",
      fechaFin: 'Mié. 9 sep. 2021',
      horario: '11:00 am-10:00 pm',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '35€'
    },
    {
      titulo: 'Fontaneria',
      fechaInicio: "12.08.2021",
      fechaFin: 'Mié. 9 sep. 2021',
      horario: '11:00 am-10:00 pm',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '35€'
    },
    {
      titulo: 'Fontaneria',
      fechaInicio: "12.08.2021",
      fechaFin: 'Mié. 9 sep. 2021',
      horario: '11:00 am-10:00 pm',
      foto: '/assets/fontaneria.png',
      numeroOrden: "XX",
      precio: '35€'
    }
  ];

  constructor() { }

  ngOnInit() {

  }

  onClickItemContratados() {
    console.log("Item contratados clicked");
  }

  onClickItemHistorial() {
    console.log("Item historial clicked");
  }

}
