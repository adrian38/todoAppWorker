import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, PopoverController } from '@ionic/angular';
import { PopoverIaeComponent } from 'src/app/components/popover-iae/popover-iae.component';

@Component({
  selector: 'app-adjuntar',
  templateUrl: './adjuntar.page.html',
  styleUrls: ['./adjuntar.page.scss'],
})
export class AdjuntarPage implements OnInit {

  punto_naranja = '../../assets/icons/punto_naranja.svg';
  punto_gris = '../../assets/icons/punto_noti.svg';

  
  constructor(private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  onNextClick(  ){
    this.presentAlert();
   // this.navCtrl.navigateRoot('/stripe', { animated: true, animationDirection: 'forward' }); 
  }

  async presentPopover(evento) {
    const popover = await this.popoverCtrl.create({
      component: PopoverIaeComponent,
      cssClass: 'iaePop',
      event: evento,
      mode: 'ios', 
      translucent: true,
      animated: true
    });
  
    await popover.present();

    const { data } = await popover.onWillDismiss();

    console.log("Item: ", data);
    // this.subir();
  }

  async presentAlert() {
    
    
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'Es necesario adjuntar el archivo.Desea hacerlo ahora',

      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        },
        {
          text: 'Después',
          handler: (datos) => {
            this.navCtrl.navigateRoot('/stripe', { animated: true, animationDirection: 'forward' }); 
          }
        }
      ]
    });

    await alert.present();
  }

}
