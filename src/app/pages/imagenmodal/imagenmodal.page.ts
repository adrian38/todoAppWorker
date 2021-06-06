
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, IonSlide, Platform, NavController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


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
              private screenOrientation: ScreenOrientation) {

                this.imagen = this.navparams.get('imagen');
               }

  ngOnInit() {
    
  
   // this.screenOrientation.unlock();
  
  //  this.screenOrientation.lock('landscape');
  }

  // ngOnDestroy(): void {
	// 	this.screenOrientation.lock('portrait');
	// }

/*   cerrar() {
	  this.screenOrientation.lock('portrait');
		this.modalCtrl.dismiss();
	} */

}
