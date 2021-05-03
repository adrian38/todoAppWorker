import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {

  avatarusuario:string =""; 

  constructor(private platform: Platform,
              public navCtrl: NavController) { }

  ngOnInit() {
    this.avatarusuario =  '../../../assets/registro.svg'


    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/contratados-chat-detalles', {animated: true, animationDirection: 'back' }) ;
  
       
       }); 
  }

}

