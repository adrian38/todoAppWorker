import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {


  constructor(public navCtrl:NavController) { }

  ngOnInit() {
  }

  datospersonales(){
    this.navCtrl.navigateRoot('/datos-personales', {animated: true, animationDirection: 'forward' }) ;      
     
  }

  contrase(){
    this.navCtrl.navigateRoot('/contrase', {animated: true, animationDirection: 'forward' }) ;      
     
  }
  
  direccion() {
    this.navCtrl.navigateRoot('/direccion', {animated: true, animationDirection: 'forward' }) ;  
  }

  documentos(){
    this.navCtrl.navigateRoot('/documentos', {animated: true, animationDirection: 'forward' }) ;  
  }

  promociones() {
    this.navCtrl.navigateRoot('/promociones', {animated: true, animationDirection: 'forward' }) ;  
  }

  
}
