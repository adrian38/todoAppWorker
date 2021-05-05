import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service'
import { Photo } from 'src/app/interfaces/interfaces'
import { Address, UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  usuario:UsuarioModel;
  

  categorias: string [] = ['Electricista', 'Fontanero'];
  categoriaSelected: string = '';
  isCatTouched: boolean = false;

  entJuridica: string [] = ['Empresa', 'Autónomo'];
  entJuridicaSelected: string = '';
  isEntTouched: boolean = false;
  
  nombre = '';
  date = '';
  user = '';
  password = '';
  confirmPass = '';
  cifNif = '';
  segSocialNumber = '';
  IAE = ''; 
  DNI = '';
  cuentaBancaria = '';
  phone = '';
  streetNumber = '';
  number = '';
  floor = '';
  portal = '';
  stair = '';
  door = '';
  postalCode = '';
  avatarUsuario = '../../assets/icons/registro.svg';
  avatarUsuario64:string="";

  selectFoto = false;
  coordenadas = false;
  esMayorEdad = true;

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public datos: ObtSubSService,
              public navCtrl: NavController,
              private _signupOdoo: SignUpOdooService,
              public photoService: PhotoService,
              public _authOdoo: AuthOdooService) { }

  ngOnInit() {

  }

 async presentAlert() {
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
              this.avatarUsuario= photo.webviewPath;
              console.log(this.avatarUsuario);
              this.avatarUsuario64= this.photoService.devuelve64();
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
              
              this.avatarUsuario= photos[0].webviewPath;
              console.log(this.avatarUsuario);
              this.avatarUsuario64= this.photoService.devuelve64(); 
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (event) => {
            this.selectFoto = false;
            if(this.usuario.avatar.length == 0){
              this.avatarUsuario =  '../../../assets/fotoadd.png'
            }
            else{
              this.avatarUsuario = this.usuario.avatar;
            }
            this.avatarUsuario64="";
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  } 

  editar(){
    // this.usuario = new UsuarioModel;
    // this.usuario.address=new Address('','','','','','','','','');
    // this.usuario.realname=this.nombre;
    // this.usuario.date=this.date;
    // this.usuario.password=this.password;
    
    // this.usuario.username =this.user;
    
    // this.usuario.type = 'client';
    
    // this.usuario.address.street=this.streetNumber; 
    // this.usuario.address.door=this.door;
    // this.usuario.address.stair=this.stair;
    // this.usuario.address.portal=this.portal;
    // this.usuario.address.cp=this.postalCode;
    // this.usuario.address.number=this.number;
    // this.usuario.address.floor=this.floor;
    // this.usuario.avatar = this.avatarUsuario64;

    // this.usuario.address.latitude=String(this.datos.getlatitud());
    // this.usuario.address.longitude=String(this.datos.getlongitud());


    // /*  console.log(this.usuario,"nuevo usuario"); */
    // this.datos.setcoordenada(false);

    // this._signupOdoo.newUser(this.usuario);  
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create(
      {
        message,
        duration: 2000
      }
    );

    toast.present();
  }

  ubicacion(){
    // this.entrar_campos();
    // this.datos.setruta("datospersonales");
    // this.navCtrl.navigateRoot('/regismapa', {animated: true, animationDirection: 'forward' }) ;
  }

  entrar_campos(){
    // this.datos.setnombre(this.nombre);
    // /* console.log("registronombre",this.nombre); */
    //   this.datos.setcorreo(this.user);
    //  this.datos.setcontraseña(this.password);
 
     
    //  this.datos.setcalle(this.streetNumber);
    //  this.datos.setpiso(this.floor);
    //  this.datos.setnumero(this.number);
    //  this.datos.setpuerta(this.door);
    //  this.datos.setportal(this.portal);
    //  this.datos.setescalera(this.stair);
    //  this.datos.setcod_postal(this.postalCode); 
    //  this.datos.setfoto0(this.avatarUsuario64);
  }

  onPictureClick(event) {
    this.selectFoto = true;
   // this.presentAlert();
  }


  onLocationClick(event) {
    this.coordenadas = true;
    console.log('Location clicked');
  }

  validarMayorDeEdad(date: string) {

    // Ver si se puede mejorar este algoritmo

    const inputDate = new Date(date);
    const currentDate = new Date(Date.now());

    const bYears = inputDate.getFullYear();
    const timeYears = currentDate.getFullYear();

    const difYears = timeYears - bYears;

    // Cantidad de meses entre las 2 fechas
    const months = (difYears * 12) + (currentDate.getMonth() - inputDate.getMonth());

    // 18 años son 12 meses por 18 asi que son 216 meses
    // si la diferencia de meses entre las 2 fechas es mayor que 216 meses entonces
    // la persona es mayor de 18 años.
    // Este algoritmo no toma en cuenta los dias que quedan en el mismo mes, asi que si cumple 18
    // en el mismo mes en curso pero no los ha cumplido todavia, se toma en consideración.
    
    if (months >= 216) {
      console.log("Es mayor de edad");
      this.esMayorEdad = true;
    }
    else {
      console.log("No es mayor de edad");
      this.esMayorEdad = false;
    }
  }

  onCatChange() {
    this.isCatTouched = true;
    console.log("El valor es ", this.categoriaSelected);
  }

  onCatCancel() {
    this.isCatTouched = true;
    console.log("El valor es ", this.categoriaSelected);
  }

  onEntChange() {
    this.isEntTouched = true;
    console.log("El valor es ", this.entJuridicaSelected);
  }

  onEntCancel() {
    this.isEntTouched = true;
    console.log("El valor es ", this.entJuridicaSelected);
  }

}
