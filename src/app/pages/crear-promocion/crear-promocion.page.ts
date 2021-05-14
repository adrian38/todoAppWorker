import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.page.html',
  styleUrls: ['./crear-promocion.page.scss'],
})
export class CrearPromocionPage implements OnInit {

  titulo = '';
  precio: number;
  comentario = '';
  fotos: string [] = [];

  constructor(private platform : Platform,
              private navCtrl  : NavController,
              private subServ  : ObtSubSService) { }

  ngOnInit() {

    this.subServ.setruta('crear-promocion');
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
 });
  }

}
