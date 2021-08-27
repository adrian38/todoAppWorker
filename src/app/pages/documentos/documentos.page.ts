import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PopoverIaeComponent } from 'src/app/components/popover-iae/popover-iae.component';
import { Photo } from 'src/app/Interfaces/interfaces';
import { PhotoService } from 'src/app/services/photo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
  providers: [MessageService]
})
export class DocumentosPage implements OnInit {

  foto:string="";
  avatarUsuario64:string="";
  loading: HTMLIonLoadingElement = null;
  
  constructor(private subServ  : ObtSubSService,
              private platform : Platform,
              private navCtrl  : NavController,
              private popoverCtrl: PopoverController,
              private photoService: PhotoService,
              public loadingController: LoadingController,
              private toastController: ToastController,
              private messageService: MessageService) { }

  ngOnInit() {
    this.subServ.setruta('documentos');
    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
  }

  onAnadir() {
    if(this.foto == ""){
      console.log("no hay nada seleccionado");
      this.messageService.add({ severity: 'error', detail: 'Seleccione un documento' });
     
    }
    else{
      console.log("hay seleccionado algo");
      this.presentLoading("Salvando documento IAE");
      this.messageService.add({ severity: 'success', detail: 'Documento IAE Salvado Correctamente' });

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

  async abrirCamara() {
    console.log('camara abierta')
    let photo: Photo = await this.photoService.addNewToCamara();
              console.log( "Foto",photo.webviewPath);
              if(photo){
                   
                   this.foto=photo.webviewPath;
                    console.log(this.foto);
                    this.avatarUsuario64= this.photoService.devuelve64().slice(22); 
                    console.log('f64',this.avatarUsuario64);
                    //this.foto1= this.photoService.devuelve64();
  
                  
                
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
      console.log('documento abierta');
      //this.presentToast("Los documentos no estan habilitados");
      
     }

     async presentLoading(sms) {
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: sms,
        
        duration:4000
      });
  
      return this.loading.present();
    }

    // async presentToast(message:string) {
    //   const toast = await this.toastController.create({
    //     message: message,
    //     duration: 2000
    //   });
    //   toast.present();
    // }
}
