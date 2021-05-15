import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Photo } from 'src/app/Interfaces/interfaces';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.page.html',
  styleUrls: ['./crear-promocion.page.scss'],
})
export class CrearPromocionPage implements OnInit {

  titulo = '';
  precio: number;
  comentario = '';
  fotos: string [] = [];

  foto1:string='../../../assets/icons/fotoadd.png';
  foto2:string='../../../assets/icons/fotoadd.png';
  foto164:string='';
  foto264:string='';

  constructor(private platform : Platform,
              private navCtrl  : NavController,
              private subServ  : ObtSubSService,
              public photoService: PhotoService,
              private alertCtrl: AlertController) { }

  ngOnInit() {

    this.subServ.setruta('crear-promocion');
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
 });
  }

  async presentAlert( posicion :boolean) {
    const alert = await this.alertCtrl.create({
      header: '¿Desea colocar una foto?',
      message: 'Selecione la opcion de camara o galeria para la foto ',
      buttons: [
        {
          text: 'Cámara',
          handler: async () => {
            let photo: Photo = await this.photoService.addNewToCamara();
            console.log( "Foto",photo.webviewPath);
            if(photo){
                 if(posicion == true){
                  this.foto1=this.photoService.devuelve64();
                  console.log(this.foto1);
                  this.foto164= this.photoService.devuelve64();
                 }
                 else{
                  this.foto2=this.photoService.devuelve64();
                  console.log(this.foto2);
                  this.foto264= this.photoService.devuelve64();
                 }
              
            }
          }
        },
        {
          text: 'Galería',
          handler: async () => {
            this.photoService.photos = [];     
            let photos: Photo[] = await this.photoService.addNewToGallery();
            // console.log("Fotos",JSON.stringify(this.photoService.photos));

            if(photos.length == 1){

              if(posicion == true){
                this.foto1= this.photoService.devuelve64(); 
                console.log(this.foto1);
                this.foto164= this.photoService.devuelve64(); 
              }
              else {
                this.foto2= this.photoService.devuelve64(); 
                console.log(this.foto1);
                this.foto264= this.photoService.devuelve64(); 
              }
              
         
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (event) => {
            if(posicion == true){
              
              this.foto1 =  '../../../assets/icons/fotoadd.png'
            }
            else{
              this.foto2 =  '../../../assets/icons/fotoadd.png'

            }

          
     
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  }

  onclickFoto1( posicion:boolean){
    this.presentAlert( posicion);
  }

  onclickFoto2( posicion:boolean){
    this.presentAlert( posicion);
  }

}
