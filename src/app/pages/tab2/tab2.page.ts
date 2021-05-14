import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Servicio } from 'src/app/Interfaces/interfaces';
import { TaskModel } from 'src/app/models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  task           : TaskModel;
  titulo_contratado: string = '';
  titulo_historial: string = '';
  contratadosList: TaskModel[];
  historialList  :TaskModel[];

  contratado_vacio :boolean=false;
  historial_vacio  :boolean=false;



  constructor( private _taskOdoo: TaskOdooService,
               private navCtrl: NavController,
               private subServ: ObtSubSService) { }

  ngOnInit() {
    this.subServ.setruta('tabs/tab2');
    this.contratadosList = this._taskOdoo.getContratadosList();
    this.historialList   = this._taskOdoo.getHistorialList();
    console.log("contratado",this.contratadosList.length);

   this.cantidad_contratados_historial();

    

  }

  ngOnDestroy() {

  }

  onClickItemContratados(i) {
    this.task = this.contratadosList[i]; 
    this._taskOdoo.setTaskCesar(this.task);
    
    this.navCtrl.navigateRoot('/contratados-chat-detalles', { animated: true, animationDirection: 'forward' }); 
  }

  cantidad_contratados_historial(){
     
    if (this.contratadosList.length < 1) {
      this.contratado_vacio=true;
      }
      else{
        this.contratado_vacio=false;
      }

      if (this.historialList.length < 1) {
        this.historial_vacio=true;
        }
        else{
          this.historial_vacio=false;
        }
  }

  onClickItemHistorial(i) {
    this.task = this.contratadosList[i]; 
    this._taskOdoo.setTaskCesar(this.task);
    
    this.navCtrl.navigateRoot('/historial-detalles', { animated: true, animationDirection: 'forward' }); 
  }

  tituloContratado(i){
        
    this.titulo_contratado=this.contratadosList[i].title;
    if (this.titulo_contratado.length <16){
      return this.titulo_contratado;
    }
    else {
      return  this.titulo_contratado.slice(0,15) + " ... ";
      }
  }

  tituloHistorial(i){
    this.titulo_historial=this.historialList[i].title;
    if (this.titulo_historial.length <16){
      return this.titulo_historial;
    }
    else {
      return  this.titulo_historial.slice(0,15) + " ... ";
      }
  }

}
