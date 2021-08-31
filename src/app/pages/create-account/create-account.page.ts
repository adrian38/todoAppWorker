import { Component, NgZone, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, NavController, PopoverController, ToastController ,Platform, LoadingController} from '@ionic/angular';
import { PhotoService } from 'src/app/services/photo.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { City, Photo } from 'src/app/interfaces/interfaces'
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Address } from 'src/app/models/usuario.model';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  providers: [MessageService]
})
export class CreateAccountPage implements OnInit {

  customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  };

  usuario:UsuarioModel;
  
  
  isCatTouched: boolean = true;

  loading: HTMLIonLoadingElement = null;
  isEntTouched: boolean = true;
  
  confirmPass = '';
  nombre = '';
  date = '';
  user = '';
  password = '';
  
  cifNif = '';
  segSocialNumber = '';
  vat = ''; 
  DNI = '';
  dni_correcto:string = '';
  cuentaBancaria = '';
  phone = '00';
  
  
  
  streetNumber = '';
  number = '';
  floor = '';
  portal = '';
  stair = '';
  door = '';
  postalCode = ''; 
  avatarUsuario = '../../assets/icons/registro.svg';
  avatarUsuario64:string="";
  avatarUsuarioComprimida:string="";

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
  dni_mal              :boolean=false;
  confirmPassBoolean    :boolean=false;
  btn_deshabilitar:boolean=false;


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
              private ngZone: NgZone,
              private messageService: MessageService,
              public loadingController: LoadingController) { 

                this.usuario = new UsuarioModel();
                this.usuario.address = new Address();



                this.oficio = [
                  {name: 'Fontanero'},
                 // {name: 'Electricista'},
                  
              ];

              this.empresa = [
                {name: 'Autonomo'},
                {name: 'Empresarial'},
                
            ];

              }

  ngOnInit() {

    this.obtener_campos();

    
    
    this.platform.backButton.subscribeWithPriority(10, () => {

        this.navController.navigateRoot('/terminos', {animated: true, animationDirection: 'back' }) ;
 
      });

      
      //console.log("co",this.coordenadas);

      this.notificationError$ = this._signupOdoo.getNotificationError$();
      this.subscriptionError = this.notificationError$.subscribe((notificationError) => {
        this.ngZone.run(() => {
          if (notificationError) {
        
            //console.log("error creando usuario")
            this.loading.dismiss();
            //this.presentToast("El usuario no se creo correctamente")
            this.btn_deshabilitar=false;
            this.messageService.add({ severity: 'error', detail: 'El usuario no se creo correctamente' });
            //this.presentToast("Error por usuario ya creado o conectividad")
            //error por usuario ya creado o conectividad o datos ingreados///////esto lo vamos a definir despues
          }
        });
      });
      this.notificationOK$ = this._signupOdoo.getNotificationOK$();
      this.subscriptionOk = this.notificationOK$.subscribe((notificationOK) => {
        this.ngZone.run(() => {
          if (notificationOK) {
            //quitar cargado e ir a la pagina de logguearse
            this.loading.dismiss();
            this.btn_deshabilitar=true;
            //console.log("exito creando usuario")
            //let test = this._signupOdoo.getUserInfo();
            //console.log("usuario creado", test);
            //this.presentToast("Su usuario se creo correctamente");
            this.messageService.add({ severity: 'success', detail: 'Su usuario se creo correctamente' });


            setTimeout(() => {
              this.navCtrl.navigateRoot('/adjuntar', { animated: true, animationDirection: 'forward' }); 

            }, 3000);
    
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
    //console.log("oficio" ,this.selectedOficio)

  }

  emitEmpresa(){

    if(!this.selectedEmpresa){
      this.isEntTouched = true
    }else
    this.isEntTouched = false
    //console.log("empresa" ,this.selectedEmpresa)

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
            //console.log( "Foto",photo.webviewPath);
            if(photo){
              this.avatarUsuario= photo.webviewPath;
              console.log(this.avatarUsuario);
              this.avatarUsuario64= this.photoService.devuelve64();
             // //console.log('f64',this.avatarUsuario64.slice(22));
            }
          }
        },
        {
          text: 'Galería',
          handler: async () => {
            this.photoService.photos = [];     
            let photos: Photo[] = await this.photoService.addNewToGallery();
            // //console.log("Fotos",JSON.stringify(this.photoService.photos));

            if(photos.length == 1){
              
              this.avatarUsuario= photos[0].webviewPath;
              //console.log(this.avatarUsuario);
              this.avatarUsuario64= this.photoService.devuelve64(); 
              //console.log('f64',this.avatarUsuario64.slice(22));
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (event) => {
            this.selectFoto = false;
            if(this.usuario.avatar.length == 0){
              //this.avatarUsuario =  '../../../assets/fotoadd.png'
             this.avatarUsuario = '../../assets/icons/registro.svg';
            }
            else{
              this.avatarUsuario = this.usuario.avatar;
            }
            this.avatarUsuario64="";
            //console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  }

 
  // async presentToast(message: string) {
  //   const toast = await this.toastCtrl.create(
  //     {
  //       message:message,
  //       duration: 3000
  //     }
  //   );

  //   toast.present();
  // }

 
  

  onPictureClick(event) {
    this.selectFoto = true;
    this.presentAlert();
  }

  onLocationClick(event) {
    //this.coordenadas = true;
    this.entrar_campos();
    //console.log('Location clicked');
    this.navCtrl.navigateRoot('/mapa-registro', { animated: true, animationDirection: 'forward' }); 
  }

  onNextClick() {
    

    
    this.validarCamposVacio();
     
  }

  validarCamposVacio(){
    
     if(this.avatarUsuario == '../../assets/icons/registro.svg'){
      //console.log( 'vacio foto')
      this.selectFoto=false;
      
    }
    else{
      this.selectFoto=true;
    }

    if(!this.selectedOficio){
      //console.log( 'no oficio seleccionado')
      
      this.isCatTouched=true;
      
    }
    else{
      this.isCatTouched=false;
      //console.log( ' oficio seleccionado')
    }

    if(!this.selectedEmpresa){
      //console.log( 'no empresa')
      
      this.isEntTouched=true;
      
    }
    else{
      this.isEntTouched=false;
      //console.log( 'si empresa')
    }


    if(this.nombre == ""){
      //console.log( 'vacio',this.nombre)
      this.nombreVacio=true;
   
    }
    else{
      this.nombreVacio=false;
      //console.log( 'lleno',this.nombre)
    }

    if(this.date == ""){
      //console.log( 'vacio fecha de nacimiento')
      this.fecha_nacimiento=true;
     
    }
    else{
      this.fecha_nacimiento=false;
      //console.log( ' fecha de nacimiento',this.date.slice(0,10))
    }

    if(this.user == ""){
      //console.log( 'vacio user')
      this.user_vacio=true;
     
    }
    else{
      this.user_vacio=false;
      //console.log( 'user',this.user)
    }

    if(this.password == ""){
      //console.log( 'vacio user')
      this.password_vacio=true;
     
    }
    else{
      this.password_vacio=false;
      //console.log( 'vacio user',this.password)
    }

    if(this.confirmPass == ""){
      //console.log( 'vacio user')
      this.confirmPass_vacia=true;
      
    }
    else{
      if(this.confirmPass == this.password){
        this.confirmPass_vacia=false;
        this. confirmPassBoolean=false;

        
      }
      else{
        this.confirmPass_vacia=false;
        this. confirmPassBoolean=true;

      }
    }

    if(this.vat == ""){
      //console.log( 'vacio cifnif')
      this.cifNif_vacio=true;
     
    }
    else{
      this.cifNif_vacio=false;
    }

    if(this.segSocialNumber == ""){
      //console.log( 'vacio seguridad')
      this.segSocialNumber_vacio=true;
     
    }
    else{
      this.segSocialNumber_vacio=false;
    }

    if(this.dni_correcto == ""){
      //console.log( 'El dnii esta vacio')
      this.DNI_vacio=true;
      this.dni_mal=false;
    
    }
    else{
      this.DNI_vacio=false;
    }

    

    if(this.cuentaBancaria == ""){
      //console.log( 'vacio seguridad')
      this.cuentaBancaria_vacio=true;
     
    }
    else{
      this.cuentaBancaria_vacio=false;
    }

    if(this.phone == ""){
      //console.log( 'vacio seguridad')
      this.phone_vacio=true;
      
    }
    else{
      this.phone_vacio=false;
      //console.log( 'tele',this.phone)

    }
    
    if(this.streetNumber == ""){
      //console.log( 'vacio seguridad')
      this.streetNumber_vacio=true;
     
    }
    else{
      this.streetNumber_vacio=false;
      //console.log( 'calle',this.streetNumber);
      
    }

    if(this.number == ""){
      //console.log( 'vacio seguridad')
      this.number_vacio=true;
     
    }
    else{
      this.number_vacio=false;
      //console.log( 'calle',this.number);
    }

    if(this.coordenadas==true){
      this.coordenadas_puesta=true;
    }
    else
    this.coordenadas_puesta=false; 


    /////*****Si todo esta bien */
   
     this.validar_DNI(this.DNI);
        
  

  if(this.selectFoto && this.coordenadas_puesta && this.isCatTouched == false && this.nombreVacio == false && this.fecha_nacimiento == false && this.user_vacio == false && this.password_vacio==false && this.confirmPass_vacia == false &&  this.cifNif_vacio == false && this.segSocialNumber_vacio==false && this.cuentaBancaria_vacio==false && this.phone_vacio==false && this.streetNumber_vacio==false&&   this.number_vacio==false)   
 { 
  this.btn_deshabilitar=true;

  let testUser = new UsuarioModel();
  testUser.address = new Address();

 testUser.type = this.selectedOficio.name;
 if(this.selectedEmpresa.name === 'Empresarial')
 {testUser.is_company =true ;}
 else{
 testUser.is_company =false ;
}
 testUser.realname = this.nombre;
 testUser.date = this.date.slice(0,10);
 testUser.username = this.user;
 testUser.password = this.password;
 testUser.dni = this.dni_correcto.toUpperCase();
 testUser.phone = this.phone;
 testUser.social_security = this.segSocialNumber;
 testUser.bank_ids = this.cuentaBancaria.toUpperCase();
 testUser.vat=this.vat.toUpperCase();

 testUser.address.street = this.streetNumber;
 testUser.address.number = this.number;
 testUser.address.floor = this.floor;
 testUser.address.portal = this.portal;
 testUser.address.door = this.door;
 testUser.address.stair = this.stair;
 testUser.address.cp = this.postalCode;

 testUser.address.latitude = this.datos.getlatitud().toString();
 testUser.address.longitude = this.datos.getlongitud().toString();

 let foto =this.avatarUsuario64.slice(22);

if (
  Buffer.from(foto.substring(foto.indexOf(',') + 1)).length / 1e6 >
  0.322216
) {
  this.resizedataURL(foto, 1280, 960);
} else {
  this.avatarUsuarioComprimida = foto.substring(foto.indexOf(',') + 1);
  //console.log("else de foto0",	this.avatarUsuarioComprimida )
}

 testUser.avatar =this.avatarUsuarioComprimida ;
 //console.log("fin foto",	testUser.avatar)
   
  this.presentLoading("Creando ususario");
  console.log('entre al paso de crear',testUser)
  this._signupOdoo.newUser(testUser);
  
  
}
else {
  
  //Poner Toast q sirva
    console.log("error en los campos")
   //this.presentToast("Su informacion tiene errores");
   this.btn_deshabilitar=false;
    this.messageService.add({ severity: 'error', detail: 'Su informacion tiene errores' });
}


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
      //console.log("Es mayor de edad");
      this.esMayorEdad = true;
    }
    else {
      //console.log("No es mayor de edad");
      this.esMayorEdad = false;
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
      this.avatarUsuarioComprimida= temp.substring(temp.indexOf(',') + 1);
      //console.log("funcion foto",	this.avatarUsuarioComprimida)
		};
	}

  validar_DNI(temp_dni){

    let letra:string;
    let digito_letra=temp_dni.slice(8,9);
    //console.log('letra final ',digito_letra);
    let digito1=temp_dni.slice(0,1);
    //console.log('d1',digito1);

    let digito_total=temp_dni.slice(0,8);
    //console.log('dt',digito_total);
    
    if(digito1 != 0){
      let resto=digito_total % 23
      //console.log('resto',resto);

      switch(resto) {
        case 0:
          letra='T'
        break;
        
        case 1:
          letra='R'
        break;

        case 2:
          letra='W'
        break;

        case 3:
           letra='A'
        break;

        case 4:
            letra='G'
        break;
                
        case 5:
            letra='M'
        break;
                
        case 6:
            letra='Y'
        break;

        case 7:
            letra='F'
        break;

        case 8:
            letra='P'
        break;

        case 9:
            letra='D'
        break;

        case 10:
            letra='X'
        break;

        case 11:
            letra='B'
        break;

        case 12:
            letra='N'
        break;

        case 13:
            letra='J'
        break;

        case 14:
            letra='Z'
        break;

        case 15:
            letra='S'
        break;

        case 16:
          letra='S'
      break;

      case 17:
        letra='V'
     break;

      case 18:
        letra='H'
     break;

    case 19:
     letra='L'
    break;

    case 20:
     letra='C'
       break;

    case 21:
       letra='K'
    break;

    case 22:
      letra='E'
    break;

        default:
          // code block
      }

     //console.log('letra a comparar',letra);
      if(letra == digito_letra){
        this.dni_correcto=temp_dni
        //console.log('el dni esta bien es',temp_dni)
        this.DNI_vacio=false
        //console.log('el dni esta bien es boo', this.DNI_vacio)
        this.dni_mal=false;

      }
      else{
        //console.log('el dni esta mal es')
        this.dni_correcto="";
        this.dni_mal=true;
        //this.presentToast("DNI incorrecto");
      }
    }
    else{
      //console.log('el dni esta mal es')
      this.dni_correcto="";
      this.dni_mal=true;
      //this.presentToast("DNI incorrecto");
    }
  }

  async presentLoading(sms) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: sms,
      //spinner: 'circles',
      //duration: 2000
    });

    return this.loading.present();
  }


  entrar_campos() {

		this.datos.setnombre(this.nombre.trim());
		this.datos.setoficio(this.selectedOficio.name);
    this.datos.setEmpresa(this.selectedEmpresa.name);
		
    
    this.datos.setcontraseña(this.password);
    this.datos.setcontraseñaConfirmafa(this.confirmPass.trim());
		
    
    this.datos.setcorreo(this.user.trim().toLowerCase());
		this.datos.settelefono(this.phone);
		this.datos.setfecha(this.date.slice(0,10));
		this.datos.setnumero(this.number);
		this.datos.setcalle(this.streetNumber.trim());
    this.datos.setdni(this.DNI);
    this.datos.setseguridadSocial(this.segSocialNumber);
    this.datos.setcuentaBanco(this.cuentaBancaria);
    this.datos.setcif(this.vat);
    
    this.datos.setselectfoto(this.selectFoto);
    this.datos.setfoto22(this.avatarUsuario)
		this.datos.setfotoRegis(this.avatarUsuario64);
    
    
    this.datos.setpiso(this.floor);
    this.datos.setportal(this.portal);
    this.datos.setpuerta(this.door);
    this.datos.setescalera(this.stair);
    this.datos.setcod_postal(this.postalCode);

	}

  obtener_campos() {
		this.nombre = this.datos.getnombre().trim();
    
    this.password = this.datos.getcontraseña();
    this.confirmPass=this.datos.getcontraseñaConfirmafa();
    
    this.user=this.datos.getcorreo();
    this.phone=String(this.datos.gettelefono());
    this.number=this.datos.getnumero();
    this.streetNumber=this.datos.getcalle();
    this.DNI=this.datos.getdni();
    this.segSocialNumber=this.datos.getseguridadSocial();
    this.cuentaBancaria=this.datos.getcuentaBancaria();
    this.vat=this.datos.getcif();
    this.floor = this.datos.getpiso();
		this.door = this.datos.getpuerta();
		this.portal = this.datos.getportal();
		this.stair = this.datos.getescalera();
		this.postalCode = this.datos.getcod_postal();
		this.date= this.datos.getfecha();

		this.selectFoto = this.datos.getselectfoto();
    
    this.avatarUsuario = this.datos.getfoto22();
    this.avatarUsuario64 = this.datos.getfotoRegis();
    
    this.selectedOficio = {name:this.datos.getoficio()};
    this.selectedEmpresa = {name:this.datos.getEmpresa()}
    
    this.coordenadas=this.datos.getcoordenada();


		// this.correo = this.datos.getcorreo();
		// this.correo = this.correo.toLowerCase().trim();
		// this.pass = this.datos.getcontraseña();
		// this.ppass = this.datos.getcontraseñaConfirmafa();
		// this.telefono = this.datos.gettelefono();
		// this.coordenadas = this.datos.getcoordenada();
		
		
	}
}
