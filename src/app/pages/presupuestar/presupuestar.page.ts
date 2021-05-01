import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-presupuestar',
  templateUrl: './presupuestar.page.html',
  styleUrls: ['./presupuestar.page.scss'],
})
export class PresupuestarPage implements OnInit {

  manoobra   :number;
  materiales :number;
/*   manoobra:string="";
  materiales:string=""; */
  total:number=0;

  requieremateriales:boolean
  verpresupuestar: boolean = true;
	verdetalles: boolean = false;
	valorSegment: string = '';
  imagen:string="../../../assets/icons/noImage.svg "

  task: TaskModel;

  constructor(private _taskOdoo       :TaskOdooService,
              private alertCtrl       :AlertController,
              private navCtrl         :NavController,
              private toastController :ToastController,
              private modalCtrl       :ModalController,
              private mapsAPILoader: MapsAPILoader,) { }

  ngOnInit() {
 
   this.task=this._taskOdoo.getTaskCesar();
   console.log("no estoy Presupuestado",this.task);
   console.log("obra",this.manoobra);
   console.log("material",this.materiales);
    //this.requieremateriales=this.task.require_materials;

    this.mapsAPILoader.load().then(() => {
      var directionsService = new google.maps.DirectionsService();
      var start=new google.maps.LatLng(50.995093,-16.417091);
      var end=new google.maps.LatLng(50.997698,-16.41788);
      
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
       console.log("llegue",result);

        }

      });
      console.log("llegue",);
     
		});

    
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
    /* if(this.materiales == "" && this.manoobra == ""){
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
         
        } */

        if(this.materiales == 0 && this.manoobra == 0 || this.materiales == undefined  && this.manoobra == undefined){
          this.total=0;
          
        }
        else{
          if(this.materiales == null){
            this.total=this.manoobra;
            console.log("materiales vacio");
            console.log("materiales vacio",this.total);
            }
            else{
              if(this.manoobra == null){
                this.total=this.materiales;
              }
              else{
                this.total=this.manoobra + this.materiales;
                console.log("campos llenos");
                console.log("lleno estoy en obras",this.total);
              }
             
            }
    }

    
  
 


  }

  material(event){
    console.log("a",this.manoobra);
    /* if(this.materiales == "" && this.manoobra == ""){
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
        } */

        if(this.materiales == 0 && this.manoobra == 0  || this.materiales == undefined  && this.manoobra == undefined){
          this.total=0;
          
        }
        else{
          if(this.manoobra == null){
            this.total=this.materiales;
            console.log("materiales vacio");
            console.log("materiales vacio",this.total);
            }
            else{
              if(this.materiales == null){
                this.total=this.manoobra;
              }
              else{
                this.total=this.manoobra + this.materiales;
                console.log("campos llenos");
                console.log("lleno estoy en obras",this.total);
              }
            }
    }



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




}
