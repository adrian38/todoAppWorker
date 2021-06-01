import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
//import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
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
              private alertCtrl: AlertController,
              ) { }

  ngOnInit() {

 

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.presentAlert();
 });
//  console.log('1.0',this.screenOrientation.type);
//  this.screenOrientation.lock('portrait');
//  console.log('2.0',this.screenOrientation.type);
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
      
      inicio(){

        this.navCtrl.navigateRoot('/login-user', { animated: true, animationDirection: 'forward' }); 
      }

      crear(){
        //this.navCtrl.navigateRoot('/create-account', { animated: true, animationDirection: 'forward' }); 
        this.navCtrl.navigateRoot('/terminos', { animated: true, animationDirection: 'forward' }); 

      }
}
