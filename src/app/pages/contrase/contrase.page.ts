import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-contrase',
  templateUrl: './contrase.page.html',
  styleUrls: ['./contrase.page.scss'],
  providers: [MessageService]
})
export class ContrasePage implements OnInit {

  loading: any;
  cambiada  :string="";
  confirmada:string="";
  btn_habilitado:boolean=false;


  error_actual:boolean=true;
  error_confirmacion:boolean=true;
  campo_vacio:boolean=false;

  usuario:UsuarioModel;

  constructor(private _authOdoo:AuthOdooService,
               private platform: Platform,
              public navCtrl: NavController,
              private toastController: ToastController,
              private messageService: MessageService,
              public loadingController: LoadingController,
              private subServ: ObtSubSService) { }

  ngOnInit() {
    this.subServ.setruta('contrase');
    this.usuario= this._authOdoo.getUser();
    console.log("usuario",this.usuario);
    console.log(" contraseña del usuario ",this.usuario.password);


    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
   
  }


  guardar(){



if(this.cambiada == "" || this.confirmada == "" ){
 // this.presentToast();
 this.campo_vacio=true;
 this.btn_habilitado=false;
}
else{
  if(this.cambiada == this.confirmada){
    this.btn_habilitado=true;      
    this.error_confirmacion=true;
    this.campo_vacio=false;
    this.presentLoading();
    setTimeout(() => {
       
      this.messageService.add({ severity: 'success', detail: 'Contraseña actualizada' });
         
         }, 3000);  
  
   
   }
   else{
     this.error_confirmacion=false;
     this.campo_vacio=true;

   } 
}

    

    
         
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando...',
      duration: 2000
    });
  
    return this.loading.present();
    }

}