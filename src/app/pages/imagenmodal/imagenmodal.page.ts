
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, IonSlide, Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-imagenmodal',
  templateUrl: './imagenmodal.page.html',
  styleUrls: ['./imagenmodal.page.scss'],
})
export class ImagenmodalPage implements OnInit {

  @ViewChild('slides', { read: ElementRef })
	slide: ElementRef;
	imagen: string;
	vertical: boolean;

  constructor(private modalCtrl: ModalController,
		private navparams: NavParams,
		public navCtrl: NavController) { }

  ngOnInit() {
    this.imagen = this.navparams.get('imagen');
  }

  cerrar() {
		//this.screenOrientation.lock('portrait');
		this.modalCtrl.dismiss();
	}

}
