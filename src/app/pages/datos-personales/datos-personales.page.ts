import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { Address, UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import {DropdownModule} from 'primeng/dropdown';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/interfaces'


@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
	


   avatarusuario:string =""; 
   avatarUsuario64:string="";
    nombre: string = '';
	fecha: string = '';
	correo: string = '';
	/* pass: string = '';
	calle: string = '';
	piso: string = '';
	numero: string = '';
	puerta: string = '';
	portal: string = '';
	cpostal: string = '';
	escalera: string = ''; */
	placeholderNombre: string = '';
	placeholderFecha: string = '';
	placeholderUser: string = '';
	placeholderCalle: string = '';
	placeholderPiso: string = '';
	placeholderNumero: string = '';
	placeholderPuerta: string = '';
	placeholderPortal: string = '';
	placeholderCp: string = '';
	placeholderEscalera: string = '';
	usuario: UsuarioModel;

	categorias: string [] = ['Electricista', 'Fontanero'];
	categoriaSelected: string = '';
	isCatTouched: boolean = false;


  constructor(private platform: Platform,
	          private navCtrl: NavController,
	          private _authOdoo: AuthOdooService,
			  private subServ: ObtSubSService,
			  public photoService: PhotoService,
			  private alertCtrl: AlertController) {
				
				
			
				
			   }

  ngOnInit() {
  //  this.avatarusuario =  '../../../assets/registro.svg'
	  /* this.avatarusuario =  '../../../assets/registro.svg' */

	  this.subServ.setruta('datos-personales');
	  this.usuario = this._authOdoo.getUser();
	  console.log('usuario actual',this.usuario);

	  this.platform.backButton.subscribeWithPriority(10, () => {
    
		this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
	
		 
		 }); 
	  this. placeholder();

 

 


 
}

placeholder() {
	

	if (this.usuario.avatar.length == 0) {
		this.avatarusuario =  '../../../assets/registro.svg'
	} else {
		this.avatarusuario = this.usuario.avatar;
	}

	 if (this.usuario.realname.length == 0) {
		this.placeholderNombre = 'Nombre y apellidos';
	} else {
		this.placeholderNombre = this.usuario.realname;
	}

	if (this.usuario.date.length == 0) {
		this.placeholderFecha = 'Fecha de nacimiento';
	} else {
		this.placeholderFecha = this.usuario.date;
	}

	if (this.usuario.username.length == 0) {
		this.placeholderUser = 'Usuario';
	} else {
		this.placeholderUser = this.usuario.username;
	}

	/* if (this.usuario.address.street.length == 0) {
		this.placeholderCalle = 'Calle';
		console.log('sin calle', this.calle);
	} else {
		this.placeholderCalle = this.usuario.address.street;
		console.log('calle', this.placeholderCalle);
	}

	if (this.usuario.address.floor.length == 0) {
		this.placeholderCalle = 'Piso';
	} else {
		this.placeholderPiso = this.usuario.address.floor;
	}

	if (this.usuario.address.number.length == 0) {
		this.placeholderNumero = 'Numero';
	} else {
		this.placeholderNumero = this.usuario.address.number;
	}

	if (this.usuario.address.door.length == 0) {
		this.placeholderNumero = 'Puerta';
	} else {
		this.placeholderPuerta = this.usuario.address.door;
	}

	if (this.usuario.address.portal.length == 0) {
		this.placeholderPortal = 'Portal';
	} else {
		this.placeholderPortal = this.usuario.address.portal;
	}

	if (this.usuario.address.cp.length == 0) {
		this.placeholderCp = 'C_Postal';
	} else {
		this.placeholderCp = this.usuario.address.cp;
	}

	if (this.usuario.address.stair.length == 0) {
		this.placeholderEscalera = 'Escalera';
	} else {
		this.placeholderEscalera = this.usuario.address.stair;
	}  */
}

/* ubicacion(){
	this.navCtrl.navigateRoot('/mapa-registro', { animated: true, animationDirection: 'forward' }); 
} */

presentAlertConfirm(){
	this.presentAlert();
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
              this.avatarusuario =photo.webviewPath;
              console.log(this.avatarusuario);
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
              
              this.avatarusuario= photos[0].webviewPath;
              console.log(this.avatarusuario);
              this.avatarUsuario64= this.photoService.devuelve64(); 
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (event) => {
            //this.selectFoto = false;
			if (this.usuario.avatar.length == 0) {
				this.avatarusuario =  '../../../assets/registro.svg'
			} else {
				this.avatarusuario = this.usuario.avatar;
			}
            this.avatarUsuario64="";
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  }
}



interface City {
    name: string,
    code: string
}