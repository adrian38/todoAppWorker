import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @Input() fecha: string = 'Miercoles, 4 de enero del 2020';
  @Input() horario: string = 'De 9:00 am a 12:00 pm';
  @Input() direccion: string = 'Calle General Aguirre # 561 entre Emilio Nunez y Marta Abreu, Cerro, La Habana, Cuba';
  @Input() precio: number = 20.25;
  @Input() fotos: any [] = [];
  @Input() nombreTrabajador: string = 'Lisniel Sanchez';

  constructor() {}

  onClickFactura(event){
    console.log('Ver Factura Clicked');
  }

  onClickUbicacion(event){
    console.log('Ubicacion Clicked');
  }

  onClickCalificar(event){
    console.log('Calificar Clicked');
  }

  onClickDenunciar(event){
    console.log('Denunciar Clicked');
  }

  onClickFinalizar(event){
    console.log('Finalizar Clicked');
  }

}
