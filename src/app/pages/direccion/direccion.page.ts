import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
  providers: [MessageService]
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
  vacio_calle:boolean = false;
  vacio_numero:boolean = false;
  coordenadas_puesta:boolean = true;
  coordenadas_puestainicial:boolean = true;
  lat:number;
  lon:number;
  loading: any;
  btn_habilitado:boolean=false;

  constructor(private platform: Platform,
              private navCtrl: NavController,
              private _authOdoo: AuthOdooService,
              private subServ: ObtSubSService,
              public loadingController: LoadingController,
              private messageService: MessageService) { }

  ngOnInit() {
    this.coordenadas_puestainicial=this.subServ.getcoordenada();
    console.log('cooo',this.coordenadas_puesta)
    this.obtenerDatos();
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
     this.guardarDatos();
	this.navCtrl.navigateRoot('/mapa-registro', { animated: true, animationDirection: 'forward' }); 
} 

editarDireccion(){
console.log('editando')
this.validar();
if(this.coordenadas_puestainicial){
  this.coordenadas_puesta=true;
}
else{
  this.coordenadas_puesta=false;
}

if(this.vacio_calle == false && this.vacio_numero==false &&  this.coordenadas_puesta==true ){
  this.btn_habilitado=true;
  this.limpiarDatos();
  this.presentLoading();
  setTimeout(() => {
       
    this.messageService.add({ severity: 'success', detail: 'Actualizando la dirección'});
       
       }, 3000);  

}
else
{
  this.btn_habilitado=false;
  this.messageService.add({ severity: 'error', detail: 'Los campos son obligatorios ' });
}



}
validar(){
  if(this.calle == ""){
    this.vacio_calle=true;
  }
  else{
    this.vacio_calle=false;
    
  }
  if(this.numero == ""){
    this.vacio_numero=true;
  }
  else{
    this.vacio_numero=false;
    
  }
}

obtenerDatos()
{
  this.calle=this.subServ.getcalle();
	this.piso=this.subServ.getpiso();
	this.numero=this.subServ.getnumero();
	this.puerta=this.subServ.getpuerta();
	this.portal=this.subServ.getportal();
	this.cpostal=this.subServ.getcod_postal();
	this.escalera=this.subServ.getescalera();
  this.lon=this.subServ.getlongitud();
  this.lat=this.subServ.getlatitud();


}

guardarDatos()
{
   this.subServ.setcalle(this.calle);
   this.subServ.setpiso(this.piso);
   this.subServ.setnumero(this.numero);
   this.subServ.setpuerta(this.puerta);
   this.subServ.setportal(this.portal);
   this.subServ.setcod_postal(this.cpostal);
   this.subServ.setescalera(this.escalera);
}

limpiarDatos()
{
   this.subServ.setcalle("");
   this.subServ.setpiso("");
   this.subServ.setnumero("");
   this.subServ.setpuerta("");
   this.subServ.setportal("");
   this.subServ.setcod_postal("");
   this.subServ.setescalera("");
}

async presentLoading() {
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Realizando pago...',
    duration: 2000
  });

  return this.loading.present();
  }

}
