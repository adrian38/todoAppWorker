import { Component, OnInit } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PopoverIaeComponent } from 'src/app/components/popover-iae/popover-iae.component';
import { Photo } from 'src/app/Interfaces/interfaces';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  foto:string="";
  
  constructor(private subServ  : ObtSubSService,
              private platform : Platform,
              private navCtrl  : NavController,
              private popoverCtrl: PopoverController,
              private photoService: PhotoService) { }

  ngOnInit() {
    this.subServ.setruta('documentos');
    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
  }

  onAnadir() {
    console.log("Anadir clicked");
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
                    //this.foto1= this.photoService.devuelve64();
  
                  
                
              }
     }
  
   async  abrirGaleria(){
       console.log('galeria abierta');
       this.photoService.photos = [];     
                let photos: Photo[] = await this.photoService.addNewToGallery();
                  
                    this.foto= photos[0].webviewPath; 
                    console.log(this.foto);
                   // this.foto164= this.photoService.devuelve64(); 
                 
             
                // }
  
     }
     abrirDocumento(){
      console.log('documento abierta');
      
     }
}
