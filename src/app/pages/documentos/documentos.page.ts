import { Component, OnInit } from '@angular/core';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { PopoverIaeComponent } from 'src/app/components/popover-iae/popover-iae.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  constructor(private subServ  : ObtSubSService,
              private platform : Platform,
              private navCtrl  : NavController,
              private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.subServ.setruta('documentos');
    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
  }

  onAnadir() {
    console.log("Anadir clicked");
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
}
