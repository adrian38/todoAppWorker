import { Component, OnInit } from '@angular/core';
import { NavController, Platform, } from '@ionic/angular';

@Component({
  selector: 'app-clasificaciones',
  templateUrl: './clasificaciones.page.html',
  styleUrls: ['./clasificaciones.page.scss'],
})
export class ClasificacionesPage implements OnInit {

  constructor( private platform: Platform,
               public navCtrl: NavController) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/tabs/tab3', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
  }


}
