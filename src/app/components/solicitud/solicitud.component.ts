import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss'],
})
export class SolicitudComponent implements OnInit {


  
  @Input() solicitud: TaskModel ;
  @Input() numero_solicitud: number ;

  titulo_solicitud:string="";
  constructor() { }

  ngOnInit() {

    console.log('componn',this.solicitud);
    console.log('componn umero',this.numero_solicitud);

    
this.tituloSolicitud();
    
  }

  
  tituloSolicitud(){
        
    this.titulo_solicitud=this.solicitud.title;
    if (this.titulo_solicitud.length <16){
      return this.titulo_solicitud;
    }
    else {
      return  this.titulo_solicitud.slice(0,15) + " ... ";
      }
  }
}
