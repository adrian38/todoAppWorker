import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Servicio } from 'src/app/Interfaces/interfaces';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  task           : TaskModel;
  contratadosList: TaskModel[];
  historialList  :TaskModel[];



  constructor( private _taskOdoo: TaskOdooService,
               private navCtrl: NavController) { }

  ngOnInit() {
    this.contratadosList = this._taskOdoo.getContratadosList();
    this.historialList   = this._taskOdoo.getHistorialList();
    console.log("falso contratado",this.contratadosList);

  }

  ngOnDestroy() {

  }

  onClickItemContratados(i) {
    this.task = this.contratadosList[i]; 
    this._taskOdoo.setTaskCesar(this.task);
    
    this.navCtrl.navigateRoot('/contratados-chat-detalles', { animated: true, animationDirection: 'forward' }); 
  }

  onClickItemHistorial(i) {
    this.task = this.contratadosList[i]; 
    this._taskOdoo.setTaskCesar(this.task);
    
    this.navCtrl.navigateRoot('/historial-detalles', { animated: true, animationDirection: 'forward' }); 
  }

}
