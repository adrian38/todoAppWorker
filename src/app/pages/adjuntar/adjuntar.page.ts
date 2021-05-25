import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-adjuntar',
  templateUrl: './adjuntar.page.html',
  styleUrls: ['./adjuntar.page.scss'],
})
export class AdjuntarPage implements OnInit {

  punto_naranja = '../../assets/icons/punto_naranja.svg';
  punto_gris = '../../assets/icons/punto_noti.svg';

  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onNextClick(  ){
    this.navCtrl.navigateRoot('/stripe', { animated: true, animationDirection: 'forward' }); 
  }

}
