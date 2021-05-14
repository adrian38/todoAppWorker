import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  //direccion: string = 'Calle General Aguirre #561 entre calle General Emilio Nunez y calle Marta Abreu, Cerro, La Habana';
  pass: string = '';
	calle: string = '';
	piso: string = '';
	numero: string = '';
	puerta: string = '';
	portal: string = '';
	cpostal: string = '';
	escalera: string = '';
  placeholderCalle: string = '';
	placeholderPiso: string = '';
	placeholderNumero: string = '';
	placeholderPuerta: string = '';
	placeholderPortal: string = '';
	placeholderCp: string = '';
	placeholderEscalera: string = '';
	usuario: UsuarioModel;

  constructor(private platform: Platform,
              private navCtrl: NavController,
              private _authOdoo: AuthOdooService,
              private subServ: ObtSubSService) { }

  ngOnInit() {
    this.subServ.setruta('direccion');
    this.usuario = this._authOdoo.getUser();
	  console.log('usuario actual',this.usuario);

    this. placeholder();

    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       });
  }

  placeholder() {
	
  
     if (this.usuario.address.street.length == 0) {
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
    }  
  }

   ubicacion(){
	this.navCtrl.navigateRoot('/mapa-registro', { animated: true, animationDirection: 'forward' }); 
} 

}
