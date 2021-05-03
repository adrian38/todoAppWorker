import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-historial-detalles',
  templateUrl: './historial-detalles.page.html',
  styleUrls: ['./historial-detalles.page.scss'],
})
export class HistorialDetallesPage implements OnInit {

  task: TaskModel;

  constructor(private _taskOdoo : TaskOdooService,
              private datos     : ObtSubSService,
              private navCtrl   : NavController) { }

  ngOnInit() {

    this.task=this._taskOdoo.getTaskCesar();
    console.log(" estoy ",this.task);
  }

  onClickUbicacion ( ) {
    this.datos.setruta('historial-detalles');
    this.datos.setcalle(this.task.address.street);
    this.datos.setnumero(this.task.address.number);
    this.navCtrl.navigateRoot('/mapa', { animated: true, animationDirection: 'forward' }); 
  }

}
