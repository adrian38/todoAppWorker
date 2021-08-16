import { Component, OnInit, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Address, UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';
import { Location } from '@angular/common';
import { domainToASCII } from 'node:url';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.page.html',
  styleUrls: ['./login-user.page.scss'],
})
export class LoginUserPage implements OnInit {
  usuario: UsuarioModel;
  usuario$: Observable<UsuarioModel>;

  user: string;
  pass: string;
  islog: boolean;

  loading: HTMLIonLoadingElement = null;

  subscriptionUsuario: Subscription;

  constructor(
    private ngZone: NgZone,
    private _authOdoo: AuthOdooService,
    private _taskOdoo: TaskOdooService,
    private _signOdoo: SignUpOdooService,
    private _chatOdoo: ChatOdooService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public navController: NavController,
    private platform: Platform,
    private _location: Location
  ) {}

  ngOnInit() {
    this._taskOdoo.setInitTab(false);
    this.usuario = new UsuarioModel();
    console.log("el ususario",this.usuario);
    this.subscriptions();

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navController.navigateRoot('/inicio', {
        animated: true,
        animationDirection: 'back',
      });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptionUsuario.unsubscribe();
  }

  subscriptions() {
    this.usuario$ = this._authOdoo.getUser$();

    this.subscriptionUsuario = this.usuario$.subscribe((user) => {
      this.ngZone.run(() => {
        this.usuario = user;
        if (this.loading) {
          this.loading.dismiss();
        }
        this.checkUser();
      });
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      if (this._location.isCurrentPathEqualTo('/login')) {
        this.navController.navigateRoot('/inicio', {
          animated: true,
          animationDirection: 'back',
        });
      }
    });
  }

  checkUser() {
    
    if (this.usuario.connected) {
      this._taskOdoo.setUser(this.usuario);
      this._chatOdoo.setUser(this.usuario);

      if (!this._taskOdoo.getInit()) {
        this._taskOdoo.setInit();
        this._taskOdoo.notificationPull();
      }

      this.navController.navigateRoot('/tabs/tab1', {
        animated: true,
        animationDirection: 'forward',
      });
    } else {
      this.loading.dismiss();
      console.log("el ususario final",this.usuario);
      console.log("el ususario su error",this.usuario.error);
      
      this._signOdoo.setUser(this.usuario);
      switch(this.usuario.error) {
        case 0:
          this.presentAlertConfirm("Problema de conexión",'Intente de nuevo');
        break;
        
        case 1:
          this.Alert_documentoIAE();
        break;

        case 2:
            this.Alert_cuentaStripe();
        break;

        case 3:
          this.presentAlertConfirm("Su solicitud esta siendo verificada",'La Administracion');
        break;

        case 4:
          this.presentAlertConfirm("Usuario desabilitado",'Contactar con la administracion');
        break;
                
      
                
        default:
         
      }


     // this.presentAlertConfirm();
    }
  }

  async onSubmit(event) {
    await this.presentLoading();
    this.usuario.address = new Address();
    this._authOdoo.loginClientApk(this.usuario);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere...',
      //spinner: 'circles',
      //duration: 2000
    });

    return this.loading.present();
  }

  async presentAlertConfirm(texto1:string ,texto2:string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      header: texto1,
      message: texto2,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
      ],
    });

    await alert.present();
  }

  async Alert_documentoIAE() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      header: 'El documento IAE no se ha intruducido',
      message: 'Desea hacerlo ?',
      buttons: [
        {
          text: 'Siguiente',
          handler: (datos) => {
            this.navController.navigateRoot('/adjuntar', {animated: true,animationDirection: 'forward',});
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
      ],
    });

    await alert.present();
  }

  async Alert_cuentaStripe() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',

      header: 'Debe completar su cuenta stripe',
      message: 'Desea hacerlo ?',
      buttons: [
        {
          text: 'Siguiente',
          handler: (datos) => {
            this.navController.navigateRoot('/stripe', {animated: true,animationDirection: 'forward',});
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
      ],
    });

    await alert.present();
  }

  recuperar() {
    this.navController.navigateRoot('/recuperarcontrase', {animated: true,animationDirection: 'forward',});
  }
}
