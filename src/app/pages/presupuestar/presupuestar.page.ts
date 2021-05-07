import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController,ModalController,Platform } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';


@Component({
  selector: 'app-presupuestar',
  templateUrl: './presupuestar.page.html',
  styleUrls: ['./presupuestar.page.scss'],
})
export class PresupuestarPage implements OnInit {

/*   manoobra:string="";
  materiales:string=""; */
  manoobra   :number;
  materiales :number;
  total:number=0;

  habilitar_0:boolean;
  habilitar_1:boolean;
  habilitar_2:boolean;
  requieremateriales:boolean
  verpresupuestar: boolean = true;
	verdetalles: boolean = false;
	valorSegment: string = '';
  imagen_0:string="";
  imagen_1:string="";
  imagen_2:string="";

  task: TaskModel;

  notificationSendOffertOk$ = new Observable<number>();

  subscriptioSendOffertOk: Subscription;

  constructor(private _taskOdoo       :TaskOdooService,
              private alertCtrl       :AlertController,
              private navCtrl         :NavController,
              private toastController :ToastController,
              private modalCtrl       :ModalController,
              private ngZone          :NgZone,
              private platform        :Platform) { }

  ngOnInit() {
 
    
    this.task=this._taskOdoo.getTaskCesar();
    console.log('tarea actual',this.task);
    this._taskOdoo.solicitudeListEdit(this.task.id,2);
    this.requieremateriales=this.task.require_materials;

    this.subscriptions();

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
 });


 this.ver_imagenes();


   
  }


  subscriptions() {
    /* 	this.platform.backButton.subscribeWithPriority(10, () => {
			this.loading.dismiss();
			this.presentAlert();
		}); */

    this.notificationSendOffertOk$ = this._taskOdoo.getnotificationSendOffertOk$();
    this.subscriptioSendOffertOk = this.notificationSendOffertOk$.subscribe((PoId) => {
      this.ngZone.run(() => {
        console.log('Se envio la oferta correctamente');
        this._taskOdoo.solicitudeListEditBudget(this.task);
        this.presentAlert();///////////
             
      });
    });


  }

 

  ngOnDestroy() {
    this.subscriptioSendOffertOk.unsubscribe();
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
    if(this.materiales == 0 && this.manoobra == 0 || this.materiales == undefined  && this.manoobra == undefined){
      this.total=0;  
    }
    else{
      if(this.materiales == null){
        this.total=this.manoobra;
      }
        else{
          if(this.manoobra == null){
            this.total=this.materiales;
          }
          else{
            this.total=this.manoobra + this.materiales;  
        } 
      }
    }
  }

  material(event){
    
    if(this.materiales == 0 && this.manoobra == 0  || this.materiales == undefined  && this.manoobra == undefined){
      this.total=0;
      }
    else{
      if(this.manoobra == null){
        this.total=this.materiales;
        }
        else{
          if(this.materiales == null){
            this.total=this.manoobra;
          }
          else{
            this.total=this.manoobra + this.materiales;
           
          }
        }
       }
      }

  enviar(){ 
    if(this.total > 0){
      if(this.materiales !== null){
        this.task.materials = this.materiales;
        this.task.work_force = this.manoobra;
      }else{
        this.task.work_force = this.manoobra;
      }
      this._taskOdoo.sendOffer(this.task);

     ////////////////////////////Poner cargando en espera de respuesta
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

  imageClick(imagen) {
		this.modalCtrl
			.create({
				component: ImagenmodalPage,
				componentProps: {
					imagen: imagen
				}
			})
			.then((modal) => modal.present()); 

	}

  ver_imagenes(){
    console.log('ver imagen !!!!',this.task.photoNewTaskArray);

    if (
      typeof this.task.photoNewTaskArray !== 'undefined' && this.task.photoNewTaskArray.length == 0) 
      {
        this.imagen_0="../../../assets/icons/noImage.svg ";
        this.imagen_1="../../../assets/icons/noImage.svg ";
        this.imagen_2="../../../assets/icons/noImage.svg ";
        this.habilitar_0=true;
        this.habilitar_1=true;
        this.habilitar_2=true;
      }
    /*    if (this.task.photoNewTaskArray.length == 0)
        {
          this.imagen_0="../../../assets/icons/noImage.svg ";
          this.imagen_1="../../../assets/icons/noImage.svg ";
          this.imagen_2="../../../assets/icons/noImage.svg ";
          this.habilitar_0=true;
          this.habilitar_1=true;
          this.habilitar_2=true;
        } */
        if (this.task.photoNewTaskArray.length == 1)
        {
          this.imagen_0= this.task.photoNewTaskArray[0];
          this.imagen_1="../../../assets/icons/noImage.svg ";
          this.imagen_2="../../../assets/icons/noImage.svg ";
          this.habilitar_0=false;
          this.habilitar_1=true;
          this.habilitar_2=true;
        }
        if (this.task.photoNewTaskArray.length == 2)
        {
          this.imagen_0= this.task.photoNewTaskArray[0];
          this.imagen_1= this.task.photoNewTaskArray[1];
          this.imagen_0="../../../assets/icons/noImage.svg ";
          this.imagen_1="../../../assets/icons/noImage.svg ";
         
          this.habilitar_0=false;
          this.habilitar_1=false;
          this.habilitar_2=true;
        }
        if (this.task.photoNewTaskArray.length == 3)
        {
          this.imagen_0= this.task.photoNewTaskArray[0];
          this.imagen_1= this.task.photoNewTaskArray[1];
          this.imagen_2= this.task.photoNewTaskArray[2];
          this.habilitar_0=false;
          this.habilitar_1=false;
          this.habilitar_2=false;
        }
  }

}
