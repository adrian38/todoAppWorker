import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-presupuestar',
  templateUrl: './presupuestar.page.html',
  styleUrls: ['./presupuestar.page.scss'],
})
export class PresupuestarPage implements OnInit {

  manoobra:string="";
  materiales:string="";
  total:number=0;

  requieremateriales:boolean
  verpresupuestar: boolean = true;
	verdetalles: boolean = false;
	valorSegment: string = '';


  task: TaskModel;

  constructor(private _taskOdoo       :TaskOdooService,
              private alertCtrl       :AlertController,
              private navCtrl         :NavController,
              private toastController :ToastController) { }

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

  obra(event){
    console.log("ob",this.materiales);
    if(this.materiales == "" && this.manoobra == ""){
      this.total=0;
      
    }
    else{
      if(this.materiales == ""){
        this.total=parseInt(this.manoobra);
        console.log("materiales vacio");
        console.log("materiales vacio",this.total);
        }
        else{
          if(this.manoobra == ""){
            this.total=parseInt(this.materiales);
          }
          else{
            this.total=parseInt(this.manoobra) + parseInt(this.materiales);
            console.log("campos llenos");
            console.log("lleno estoy en obras",this.total);
          }
         
        }
    }

    
  
 


  }

  material(event){
    console.log("a",this.manoobra);
    if(this.materiales == "" && this.manoobra == ""){
      this.total=0;
      
    }
    else{
      if(this.manoobra == ""){
        this.total=parseInt(this.materiales);
        console.log("materiales vacio");
        console.log("materiales vacio",this.total);
        }
        else{
          if(this.materiales == ""){
            this.total=parseInt(this.manoobra);
          }
          else{
            this.total=parseInt(this.manoobra) + parseInt(this.materiales);
            console.log("campos llenos");
            console.log("lleno estoy en obras",this.total);
          }
        }
    }

  /*   console.log("b",this.manoobra);
    if(this.manoobra == ""){
      this.total=parseInt(this.materiales);
      console.log("bra vacio");
      console.log("mano vacio",this.total);
    }
    else{
      this.total=parseInt(this.manoobra) + parseInt(this.materiales);
      console.log("campos llenos");
      console.log("lleno estoy en materiales",this.total);
    } */

  } 
  enviar(){ 
    if(this.total > 0){
      this.presentAlert();
    }
    else
    this.toast_campos_vacio();
  
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

  async toast_campos_vacio() {
		const toast = await this.toastController.create({
			message: 'Rellene los campos necesarios',
			duration: 2000
		});
		toast.present();
	}

}
