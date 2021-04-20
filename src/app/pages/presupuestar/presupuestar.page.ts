import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-presupuestar',
  templateUrl: './presupuestar.page.html',
  styleUrls: ['./presupuestar.page.scss'],
})
export class PresupuestarPage implements OnInit {

  manoobra:number;
  materiales:number;
  total:number=101;

  requieremateriales:boolean
  verpresupuestar: boolean = true;
	verdetalles: boolean = false;
	valorSegment: string = '';


  task: TaskModel;

  constructor(private _taskOdoo: TaskOdooService,
              private alertCtrl: AlertController,
              private navCtrl: NavController) { }

  ngOnInit() {
 
    this.task=this._taskOdoo.getTaskCesar();
    console.log(" estoy Presupuestado",this.task.require_materials);
    //this.requieremateriales=this.task.require_materials;
   
  }

  segmentChanged(event){

		
		this.valorSegment = event.detail.value;
    console.log(this.valorSegment)

		if (this.valorSegment === 'presupuestar') {
			this.verpresupuestar = true;
			this.verdetalles = false;

		
		}

		if (this.valorSegment === 'detalles') {
			this.verpresupuestar = false;
			this.verdetalles = true;
		
		}
	}
/* 
  obra(event){
    this.total=this.manoobra + this.materiales;

  }

  material(event){
    this.total=this.manoobra + this.materiales;
  } */
  enviar(){
    this.presentAlert();
  }

  async presentAlert() {
    const actionSheet = await this.alertCtrl.create({
      header: '¿Desea interactuar con el cliente?',
      message: 'Selecione "Si" para ir al chat ',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.task.budget=this.total;
            this._taskOdoo.setTaskCesar(this.task);
            this.navCtrl.navigateRoot('/solicitudes-chat-detalles', { animated: true, animationDirection: 'forward' }); 
          }
        },
       
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.task.budget=this.total;
            this._taskOdoo.setTaskCesar(this.task);
            this.navCtrl.navigateRoot('/tabs/tab1', { animated: true, animationDirection: 'back' }); 
            
          }
        }
      ]
    });
    await actionSheet.present();
  }

}
