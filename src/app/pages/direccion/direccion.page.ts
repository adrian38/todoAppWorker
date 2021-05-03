import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  direccion: string = 'Calle General Aguirre #561 entre calle General Emilio Nunez y calle Marta Abreu, Cerro, La Habana';

  constructor(private platform: Platform,
    public navCtrl: NavController) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
    
      this.navCtrl.navigateRoot('/contratados-chat-detalles', {animated: true, animationDirection: 'back' }) ;
  
       
       });
  }

}
