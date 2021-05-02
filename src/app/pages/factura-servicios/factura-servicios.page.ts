import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-factura-servicios',
  templateUrl: './factura-servicios.page.html',
  styleUrls: ['./factura-servicios.page.scss'],
})
export class FacturaServiciosPage implements OnInit {

  manoObra: number;
  materiales: number;
  impuesto: number;
  impuestoPlataforma: number;
  total: number;

  task: TaskModel;

  constructor(private _taskOdoo :TaskOdooService,
    private platform: Platform,
		          public navCtrl: NavController) { }

  ngOnInit() {
   
    this.task=this._taskOdoo.getTaskCesar();
    console.log(" estoy ",this.task);

    this.manoObra = 25.50;
    this.materiales = 89.54;
    this.impuesto = 24.13;
    this.impuestoPlataforma = 35.89;
    this.total = this.manoObra + this.materiales + this.impuesto + this.impuestoPlataforma;

    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/contratados-chat-detalles', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
  }

  onClose() {
    console.log('Close clicked');
  }

}
