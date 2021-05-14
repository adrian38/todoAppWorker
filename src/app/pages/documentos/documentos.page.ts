import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  constructor(private subServ  : ObtSubSService,
              private platform : Platform,
              private navCtrl  : NavController,) { }

  ngOnInit() {
    this.subServ.setruta('documentos');
    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
  }

  onAnadir() {
    console.log("Anadir clicked");
  }

}
