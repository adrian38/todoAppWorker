import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Photo } from 'src/app/Interfaces/interfaces';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PhotoService } from 'src/app/services/photo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.page.html',
  styleUrls: ['./crear-promocion.page.scss'],
  providers: [MessageService]
})
export class CrearPromocionPage implements OnInit {

  titulo:string = "";
  any_precio:boolean=false;
  any_tittle:boolean=false;
  any_comentario:boolean=false;
  any_foto:boolean=false;
  precio: number;
  comentario = "";
  fotos: string [] = [];

  foto1:string='../../../assets/icons/fotoadd.png';
  foto2:string='../../../assets/icons/fotoadd.png';
  foto164:string='';
  foto264:string='';
  fComprimida:string=''
  btn_habilitado:boolean=false;

  constructor(private platform : Platform,
              private navCtrl  : NavController,
              private subServ  : ObtSubSService,
              public photoService: PhotoService,
              private messageService: MessageService,
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
           // console.log( "Foto",photo.webviewPath);
            if(photo){
                 if(posicion == true){
                  this.foto1=photo.webviewPath;
                  console.log(this.foto1);
                  this.foto164= this.photoService.devuelve64().slice(22);
                  //console.log('f1',this.foto164.slice(22));
                  this.fotoComprimida(this.foto164);


                 }
                 else{
                  this.foto2=photo.webviewPath;
                  console.log(this.foto2);
                  this.foto264= this.photoService.devuelve64().slice(22);
                  this.fotoComprimida(this.foto264);

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
                this.foto1= photos[0].webviewPath; 
                console.log(this.foto1);
                this.foto164= this.photoService.devuelve64().slice(22); 
                this.fotoComprimida(this.foto164);
              }
              else {
                this.foto2= photos[0].webviewPath; 
                console.log(this.foto1);
                this.foto264= this.photoService.devuelve64().slice(22); 
                this.fotoComprimida(this.foto264);
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
              this.foto164 = '';
            }
            else{
              this.foto2 =  '../../../assets/icons/fotoadd.png'
              this.foto264 = '';
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

  onAnadir(){
    this.validar_titulo();
    this.valida_precio();
    this.validar_comentario();
    this.validar_foto();
   if(this.any_tittle != true && this.any_precio != true && this.any_comentario != true && this.any_foto == false){
   this.btn_habilitado=true;
    this.messageService.add({ severity: 'success', detail: 'Datos añadidos' });
    setTimeout(() => {
     
 this.navCtrl.navigateRoot('/pago-promociones', {animated: true, animationDirection: 'forward' }) ;
  
    }, 3000);
     }
     else{
      this.btn_habilitado=false;
     }
 
 
      

  }

  validar_titulo(){
    if(this.titulo == ""){
      this.any_tittle=true;
      console.log(`s`)
   }
   else{
     console.log(`ss`)
     this.any_tittle=false;
    
   }

  }

  valida_precio(){
    if(this.precio <= 0 || this.precio == null){
      this.any_precio=true;
    }
    else
    this.any_precio=false;
  }

  validar_comentario(){
    if(this.comentario == ""){
      this.any_comentario=true;
      console.log(`s`)
   }
   else{
     console.log(`ss`)
     this.any_comentario=false;
    
   }
  }

  validar_foto(){
if((this.foto164 != "" || this.foto264 != "")){
this.any_foto= false;



}
else{
  this.any_foto= true;
  this.messageService.add({ severity: 'error', detail: 'Seleccione al menos una foto' });
}
  }

  resizedataURL(datas, wantedWidth, wantedHeight) {
		var img = document.createElement('img');
		img.src = datas;
		img.onload = () => {
			let ratio = img.width / img.height;
			wantedWidth = wantedHeight * ratio;
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');
			canvas.width = wantedWidth;
			canvas.height = wantedHeight;
			ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);
			let temp = canvas.toDataURL('image/jpeg', [ 0.0, 1.0 ]);
      this.fComprimida= temp.substring(temp.indexOf(',') + 1);
      //console.log("funcion foto",	this.avatarUsuarioComprimida)
		};
	}

  fotoComprimida(f){
    let foto =f;

if (
  Buffer.from(foto.substring(foto.indexOf(',') + 1)).length / 1e6 >
  0.322216
) {
  this.resizedataURL(foto, 1280, 960);
} else {
  this.fComprimida = foto.substring(foto.indexOf(',') + 1);

}
  }

}
