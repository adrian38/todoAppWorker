import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
})
export class TabHeaderComponent implements OnInit {
  @Input() titulo: string;
  @Input() backgroundColor: string = '';

  notification: boolean = false;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const elemento = document.getElementById('div_back');

    if (this.backgroundColor !== '') {
      elemento.style.backgroundColor = this.backgroundColor;
    }
  }
  on_Click() {
    console.log('click nuevament');
  }
  OnClickNotificaciones(){
    console.log('click campana');
    this.navCtrl.navigateRoot('/notificaciones', {animated: true, animationDirection: 'forward' }) ;


  }
}
