import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, PopoverController, ToastController ,Platform} from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { AuthOdooService } from 'src/app/services/auth-odoo.service'
import { Photo } from 'src/app/interfaces/interfaces'
import { UsuarioModel } from 'src/app/models/usuario.model';
import { PopoverIaeComponent } from 'src/app/components/popover-iae/popover-iae.component';
import { DropdownModule } from 'primeng/dropdown'
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  usuario:UsuarioModel;
  categoria:string="";
  categorias: string [] = ['Electricista', 'Fontanero'];
  categoriaSelected: string = '';
  isCatTouched: boolean = false;

  entidad:string="";
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

  selectFoto = true;
  coordenadas = true;
  esMayorEdad = true;

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public datos: ObtSubSService,
              public navCtrl: NavController,
              private _signupOdoo: SignUpOdooService,
              public photoService: PhotoService,
              public _authOdoo: AuthOdooService,
              private actionSheetCtrl: ActionSheetController,
              private popoverCtrl: PopoverController,
              public navController:NavController,
              private platform: Platform) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
      
        
        this.navController.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
        
      
      
      });

      

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
    // this.subir();
  }
/* 
  subir(){
   console.log('estoy en la funcion subir')
    
  
  
  
  } */

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
    this.presentAlert();
  }

  onLocationClick(event) {
    this.coordenadas = true;
    console.log('Location clicked');
    this.navCtrl.navigateRoot('/mapa-registro', { animated: true, animationDirection: 'forward' }); 
  }

  onNextClick(event) {
    console.log('Siguiente clicked');
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

  onCatFocusChange() {
    this.isCatTouched = true;
    console.log("El valor es ", this.categoriaSelected);
  }

  onEntFocusChange() {
    this.isEntTouched = true;
    console.log("El valor es ", this.entJuridicaSelected);
  }

  clickCategoria(){
    console.log('sjjss')
    this.presentActionSheet();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header:'Su categoria es:',
      mode:'ios',
      translucent: true,
      buttons: [
        {
          text: 'Electricista',
          cssClass: 'orange',
          
          handler: () => {
            console.log('Destructive clicked');
            this.categoria=this.categorias[0];
          }
        },{
          text: 'Fontanero',
          cssClass: 'orange',
          handler: () => {
            console.log('Archive clicked');
            this.categoria=this.categorias[1];
          }
        },{
          text: 'Cancel',
          cssClass: 'greenblue',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.categoria="";
          }
        }
      ]
    });
    actionSheet.present();
  }

  clickEntidad(){
   this.presentActionSheetEntidad()
  }

  async presentActionSheetEntidad() {
    const actionSheet = await this.actionSheetCtrl.create({
      header:'Tipo de entidad',
      mode:'ios',
      translucent: true,
      buttons: [
        {
          text: 'Empresa',
          cssClass: 'orange',
          
          handler: () => {
            console.log('Destructive clicked');
            this.entidad=this.entJuridica[0];
          }
        },{
          text: 'Autónomo',
          cssClass: 'orange',
          handler: () => {
            console.log('Archive clicked');
            this.entidad=this.entJuridica[1];
          }
        },{
          text: 'Cancel',
          cssClass: 'greenblue',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
           
            this.entidad="";
          }
        }
      ]
    });
    actionSheet.present();
  }
}
