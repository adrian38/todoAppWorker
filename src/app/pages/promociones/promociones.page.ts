import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
})
export class PromocionesPage implements OnInit {

  promociones: Promociones[] = [
    {
      titulo: 'Promocion 1',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 2',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 3',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 4',
      text: 'De productos de albanileria'
    },
    {
      titulo: 'Promocion 5',
      text: 'De productos de albanileria'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

  onFabClick() {
    console.log('Fab clicked');
  }

  promo(i: number) {
    console.log("Promocion clicked", i);
  }

}

interface Promociones {
  titulo: string,
  text: string
}
