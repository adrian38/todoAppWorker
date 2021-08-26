import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { PopoverIaeComponent } from 'src/app/components/popover-iae/popover-iae.component';
import { Photo } from 'src/app/Interfaces/interfaces';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PhotoService } from 'src/app/services/photo.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-adjuntar',
  templateUrl: './adjuntar.page.html',
  styleUrls: ['./adjuntar.page.scss'],
})
export class AdjuntarPage implements OnInit {

  punto_naranja = '../../assets/icons/punto_naranja.svg';
  punto_gris = '../../assets/icons/punto_gris.svg';
  foto:string="";
  message:string="";
  avatarUsuario64:string="";
  loading: HTMLIonLoadingElement = null;
  ruta:string="";

  notificationOK$: Observable<boolean>;
	notificationError$: Observable<boolean>;

	subscriptionError: Subscription;
	subscriptionOk: Subscription;
  
  constructor( 
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private platform: Platform,
              private photoService: PhotoService,
              private _sigupOdoo :SignUpOdooService,
              private toastController: ToastController,
              private ngZone: NgZone,
              private datos     :ObtSubSService,
              private messageService: MessageService,
              public loadingController: LoadingController) 
              
             { }

  ngOnInit() {

    this.ruta=this.datos.getruta();
    console.log(this.ruta);
    this.platform.backButton.subscribeWithPriority(10, () => {

    //this.navCtrl.navigateRoot('/create-account', {animated: true, animationDirection: 'back' }) ;
     this.presentAlertAtras();
    });


    this.notificationError$ = this._sigupOdoo.getNotificationError$();
      this.subscriptionError = this.notificationError$.subscribe((notificationError) => {
        this.ngZone.run(() => {
          if (notificationError) {
        
            
            this.loading.dismiss();
            this.presentToast("Error guardando su documento");
            //this.messageService.add({ severity: 'error', detail: 'No se creo la tarea' });
            
          }
        });
      });
      this.notificationOK$ = this._sigupOdoo.getNotificationOK$();
      this.subscriptionOk = this.notificationOK$.subscribe((notificationOK) => {
        this.ngZone.run(() => {
          if (notificationOK) {
           
            this.loading.dismiss();
            this.presentToast("Documento IAE Salvado Correctamente");
            //this.messageService.add({ severity: 'success', detail: 'Tarea creada correctamente' });

            if(this.ruta == "/login-user"){
              console.log('login')
              setTimeout(() => {
                this.navCtrl.navigateRoot('/login-user', { animated: true, animationDirection: 'forward' }); 
  
              }, 3000);
            }
            else {
              console.log('stripe')
              setTimeout(() => {
                this.navCtrl.navigateRoot('/stripe', { animated: true, animationDirection: 'forward' }); 
  
              }, 3000);
              
            }

         
    
          }
        });
      });

  }

  ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscriptionOk.unsubscribe();
		this.subscriptionError.unsubscribe();
	}

  onNextClick(  ){
    if(this.foto != ""){
      this._sigupOdoo.updateDocuments(this.avatarUsuario64);
      this.presentLoading("Espere mientras guardamos su documento IAE");

      //this.presentToast("Documento Salvado");
      //this.presentLoading("Salvando documento IAE");
      //this.navCtrl.navigateRoot('/stripe', { animated: true, animationDirection: 'forward' }); 
      
    }
    else{
      this.presentAlert();
      }


  }

  async presentPopover(evento) {
    const popover = await this.popoverCtrl.create({
      component: PopoverIaeComponent,
      cssClass: 'iaePop',
      event: evento,
      mode: 'ios', 
      translucent: true,
      animated: true
    });
  
    await popover.present();

    const { data } = await popover.onWillDismiss();

    console.log("Item: ", data);
    console.log('estoy en adjuntar',data.item);
    switch(data.item){
      case 1: {
        this.abrirCamara();
        // this.message='foto cargada';
        // this.presentToast(this.message);
        break;
      }

      case 2: {
        this.abrirGaleria();
        console.log('la foto',this.foto);
        // this.message='foto cargada';
        // this.presentToast(this.message);

          break;
       
        
              }

       case 3: {
         this.abrirDocumento();
        //  this.message='documento cargada';
        //  this.presentToast(this.message);
         break;
      }

    }
  }

  async presentAlert() {
    
    
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Es necesario adjuntar el archivo.Desea hacerlo ahora',

      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        },
        {
          text: 'Después',
          handler: (datos) => {
           
           this.navCtrl.navigateRoot('/stripe', { animated: true, animationDirection: 'forward' }); 
          }
        }
      ]
    });

    await alert.present();
  }

   async abrirCamara() {
  console.log('camara abierta')
  let photo: Photo = await this.photoService.addNewToCamara();
            console.log( "Foto",photo.webviewPath);
            if(photo){
                 
                 this.foto=photo.webviewPath;
                  //console.log(this.foto);
                  this.avatarUsuario64= this.photoService.devuelve64().slice(22); 
                  //console.log('f64',this.avatarUsuario64);
                
              
            }
   }

 async  abrirGaleria(){
     console.log('galeria abierta');
     this.photoService.photos = [];     
              let photos: Photo[] = await this.photoService.addNewToGallery();
                
                  this.foto= photos[0].webviewPath; 
                  console.log(this.foto);
                  this.avatarUsuario64= this.photoService.devuelve64().slice(22); 
                  console.log('f64',this.avatarUsuario64);
                 // this.foto164= this.photoService.devuelve64(); 
               
           
              // }

   }

   abrirDocumento(){
    console.log('documento abierto');
    this.presentToast("Los documentos no estan habilitados");
    
   }
 
   async presentToast(message:string) {
		const toast = await this.toastController.create({
			message: message,
			duration: 2000
		});
		toast.present();
	}




  async presentLoading(sms) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: sms,
      
     // duration:4000
    });

    return this.loading.present();
  }

  async presentAlertAtras() {
		const alert = await this.alertCtrl.create({
			cssClass: 'my-custom-class',
			header: 'Alerta',
			message: 'Desea salir sin adjuntar ?',

			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel: blah');
					}
				},
				{
					text: 'Aceptar',
					handler: (datos) => {
						
						this.navCtrl.navigateRoot('/login-user', { animated: true, animationDirection: 'back' });
					}
				}
			]
		});

		await alert.present();
	}
}
