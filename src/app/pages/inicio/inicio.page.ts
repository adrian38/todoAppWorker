import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import {Plugins} from '@capacitor/core';
const {SplashScreen} = Plugins;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private platform : Platform,
              private navCtrl: NavController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.presentAlert();
 });
  }

  ionViewDidEnter() {

    SplashScreen.hide();
    
  }

    async presentAlert() {
    
    
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Alerta',
          message: 'Desea salir de la aplicación',
    
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {}
            },
            {
              text: 'Aceptar',
              handler: (datos) => {
                navigator['app'].exitApp();
              }
            }
          ]
        });
    
        await alert.present();
      }

}
