import { Component, NgZone, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, PopoverController, ToastController ,Platform} from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { City, Photo } from 'src/app/interfaces/interfaces'
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Address } from 'src/app/models/usuario.model';
import { Observable, Subscription } from 'rxjs';

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
  ;
  
  isCatTouched: boolean = false;

  
  isEntTouched: boolean = false;
  
  confirmPass = '';
  nombre = '';
  date = '';
  user = '';
  password = '';
  
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

 punto_naranja = '../../assets/icons/punto_naranja.svg';
 punto_gris = '../../assets/icons/punto_gris.svg';


 

  selectFoto = true;
  coordenadas :boolean;
  coordenadas_puesta :boolean=true;
  esMayorEdad = true;

  nombreVacio          :boolean=false;
  fecha_nacimiento     :boolean=false;
  user_vacio           :boolean=false;
  password_vacio       :boolean=false;
  confirmPass_vacia    :boolean=false;
  cifNif_vacio         :boolean=false;
  segSocialNumber_vacio:boolean=false; 
  //IAE_vacio            :boolean=false; 
  DNI_vacio            :boolean=false;
  cuentaBancaria_vacio :boolean=false;
  phone_vacio          :boolean=false;
  streetNumber_vacio   :boolean=false;
  number_vacio         :boolean=false;



  oficio: City[];
  empresa: City[];

  selectedOficio:City;
  selectedEmpresa:City;


  

  notificationOK$: Observable<boolean>;
	notificationError$: Observable<boolean>;

	subscriptionError: Subscription;
	subscriptionOk: Subscription;

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public datos: ObtSubSService,
              public navCtrl: NavController,
              private _signupOdoo: SignUpOdooService,
              public photoService: PhotoService,
              private actionSheetCtrl: ActionSheetController,
              public navController:NavController,
              private platform: Platform,
              private ngZone: NgZone,) { 

                this.usuario = new UsuarioModel();
                this.usuario.address = new Address();



                this.oficio = [
                  {name: 'Fontanero'},
                  {name: 'Electricista'},
                  
              ];

              this.empresa = [
                {name: 'Autónomo'},
                {name: 'Empresarial'},
                
            ];

              }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {

        this.navController.navigateRoot('/terminos', {animated: true, animationDirection: 'back' }) ;
 
      });

      this.coordenadas=this.datos.getcoordenada();
      console.log("co",this.coordenadas);

      this.notificationError$ = this._signupOdoo.getNotificationError$();
      this.subscriptionError = this.notificationError$.subscribe((notificationError) => {
        this.ngZone.run(() => {
          if (notificationError) {
        
            console.log("error creando usuario")
            //error por usuario ya creado o conectividad o datos ingreados///////esto lo vamos a definir despues
          }
        });
      });
      this.notificationOK$ = this._signupOdoo.getNotificationOK$();
      this.subscriptionOk = this.notificationOK$.subscribe((notificationOK) => {
        this.ngZone.run(() => {
          if (notificationOK) {
            //quitar cargado e ir a la pagina de logguearse
            console.log("exito creando usuario")
  
          
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

  emitOficio(){

    if(!this.selectedOficio){
      this.isCatTouched = true
    }else
    this.isCatTouched = false;
    console.log("oficio" ,this.selectedOficio)

  }

  emitEmpresa(){

    if(!this.selectedEmpresa){
      this.isEntTouched = true
    }else
    this.isEntTouched = false
    console.log("empresa" ,this.selectedEmpresa)

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

 
  

  onPictureClick(event) {
    this.selectFoto = true;
    this.presentAlert();
  }

  onLocationClick(event) {
    //this.coordenadas = true;
    console.log('Location clicked');
    this.navCtrl.navigateRoot('/mapa-registro', { animated: true, animationDirection: 'forward' }); 
  }

  onNextClick() {
    console.log('Siguiente clicked');
    this.validarCamposVacio();
     
  }

  validarCamposVacio(){

   /*  if(this.avatarUsuario == '../../assets/icons/registro.svg'){
      console.log( 'vacio foto')
      this.selectFoto=false;
      
    }
    else{
      this.selectFoto=true;
    }

    if(!this.selectedOficio){
      console.log( 'vacio foto')
      
      this.isCatTouched=true;
      
    }
    else{
      this.isCatTouched=false;
    }

    if(!this.selectedEmpresa){
      console.log( 'vacio foto')
      
      this.isEntTouched=true;
      
    }
    else{
      this.isEntTouched=false;
    }


    if(this.usuario.realname == ""){
      console.log( 'vacio')
      this.nombreVacio=true;
      //  nombre1.touched
    }
    else{
      this.nombreVacio=false;
    }

    if(this.usuario.date == ""){
      console.log( 'vacio fecha de nacimiento')
      this.fecha_nacimiento=true;
     
    }
    else{
      this.fecha_nacimiento=false;
    }

    if(this.usuario.username == ""){
      console.log( 'vacio user')
      this.user_vacio=true;
     
    }
    else{
      this.user_vacio=false;
    }

    if(this.usuario.password == ""){
      console.log( 'vacio user')
      this.password_vacio=true;
     
    }
    else{
      this.password_vacio=false;
    }

    if(this.confirmPass == ""){
      console.log( 'vacio user')
      this.confirmPass_vacia=true;
     
    }
    else{
      this.confirmPass_vacia=false;
    }

    if(this.usuario.vat == ""){
      console.log( 'vacio cifnif')
      this.cifNif_vacio=true;
     
    }
    else{
      this.cifNif_vacio=false;
    }

    if(this.usuario.social_security == ""){
      console.log( 'vacio seguridad')
      this.segSocialNumber_vacio=true;
     
    }
    else{
      this.segSocialNumber_vacio=false;
    }

    if(this.usuario.dni == ""){
      console.log( 'vacio seguridad')
      this.DNI_vacio=true;
    
    }
    else{
      this.DNI_vacio=false;
    }

    

    if(this.usuario.bank_ids == ""){
      console.log( 'vacio seguridad')
      this.cuentaBancaria_vacio=true;
     
    }
    else{
      this.cuentaBancaria_vacio=false;
    }

    if(this.usuario.phone == 0){
      console.log( 'vacio seguridad')
      this.phone_vacio=true;
     
    }
    else{
      this.phone_vacio=false;
    }
    
    if(this.streetNumber == ""){
      console.log( 'vacio seguridad')
      this.streetNumber_vacio=true;
     
    }
    else{
      this.streetNumber_vacio=false;
    }

    if(this.number == ""){
      console.log( 'vacio seguridad')
      this.number_vacio=true;
     
    }
    else{
      this.number_vacio=false;
    }
    if(this.coordenadas==true){
      this.coordenadas_puesta=true;
    }
    else
    this.coordenadas_puesta=false; */


    /////*****Si todo esta bien */


    
    let testUser = new UsuarioModel();
    testUser.address = new Address();

    testUser.type = "fontanero";
    testUser.is_company = true;

    testUser.avatar = "";

    testUser.realname = "Adrian Nieves";
    testUser.username = "sintecho5@example.com"
    testUser.dni = "30065089H";
    testUser.password = "epicentro";
    testUser.date = "1992-08-10";
    testUser.phone = "968 88 88 88";
    testUser.bank_ids = "ES2000817353989593312425";
    testUser.social_security = "";
    testUser.vat="";

    

    testUser.address.street = '36',
    testUser.address.number = '7814',
    testUser.address.latitude = "40,47558";
    testUser.address.longitude = "-3,68992";

    this._signupOdoo.newUser(testUser);
    
    console.log("User info", testUser);

    //this.navCtrl.navigateRoot('/adjuntar', { animated: true, animationDirection: 'forward' }); 
    // if(this.avatarUsuario != '../../assets/icons/registro.svg' && this.categoria != "" && this.entidad != "" && this.nombre != "" && this.date != "" && this.user != "" && this.password != "" && this.confirmPass != "" && this.cifNif != "" &&  this.segSocialNumber != "" && this.DNI != "" && this.cuentaBancaria != "" && this.phone != "" && this.streetNumber != "" && this.number != "" &&  this.coordenadas_puesta==true){   
    //   entrar_campos
    
    //this.navCtrl.navigateRoot('/adjuntar', { animated: true, animationDirection: 'forward' }); 
    
    // }

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

 

 

  resizedataURL(datas, wantedWidth, wantedHeight, index) {
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
			//this.task.photoNewTaskArray[index] = temp.substring(temp.indexOf(',') + 1);
			
		};
	}
}
