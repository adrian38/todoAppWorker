import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-contrase',
  templateUrl: './contrase.page.html',
  styleUrls: ['./contrase.page.scss'],
  providers: [MessageService]
})
export class ContrasePage implements OnInit {


  cambiada  :string="";
  confirmada:string="";


  error_actual:boolean=true;
  error_confirmacion:boolean=true;
  campo_vacio:boolean=false;

  usuario:UsuarioModel;

  constructor(private _authOdoo:AuthOdooService,
               private platform: Platform,
              public navCtrl: NavController,
              private toastController: ToastController,
              private messageService: MessageService,
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
}
else{
  if(this.cambiada == this.confirmada){
             
    this.error_confirmacion=true;
    this.campo_vacio=false;
    this.messageService.add({ severity: 'success', detail: 'Cambio completado' });

   
   }
   else{
     this.error_confirmacion=false;
     this.campo_vacio=true;

   } 
}

    

    
         
  }

//   async presentToast() {
//     const toast = await this.toastController.create({
//       message: 'Debe rellenar los campos',
//       duration: 2000
//     });
//     toast.present();

// }
}