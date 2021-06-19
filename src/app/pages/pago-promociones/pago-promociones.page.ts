import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-pago-promociones',
  templateUrl: './pago-promociones.page.html',
  styleUrls: ['./pago-promociones.page.scss'],
})
export class PagoPromocionesPage implements OnInit {

  constructor( private navCtrl  : NavController,
               private platform : Platform) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/crear-promocion', {animated: true, animationDirection: 'back' }) ;
 });
  }

  btn_cancelar(){
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
  }
  
  btn_pagar(){
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;

  }

}
