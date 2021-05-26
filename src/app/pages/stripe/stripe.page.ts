import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {


  punto_naranja = '../../assets/icons/punto_naranja.svg';
  punto_gris = '../../assets/icons/punto_gris.svg';
  
  constructor( private navCtrl: NavController,
               private platform: Platform) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {

      this.navCtrl.navigateRoot('/adjuntar', {animated: true, animationDirection: 'back' }) ;

    });
  }

}
