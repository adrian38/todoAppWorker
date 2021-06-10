import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {


  punto_naranja = '../../assets/icons/punto_naranja.svg';
  punto_gris = '../../assets/icons/punto_gris.svg';
  
  constructor( private navCtrl: NavController,
               private platform: Platform,
               private browser  :InAppBrowser ) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {

      this.navCtrl.navigateRoot('/adjuntar', {animated: true, animationDirection: 'back' }) ;

    });
  }

  openUrl(){
    console.log('entre a google');
    this.browser.create('https://www.google.com/search?q=arduino&source=hp&ei=dluxYPagGOzS5NoP8fS40AM&iflsig=AINFCbYAAAAAYLFphnOy4nyuFSDKvvmUm-odqqnscknq&oq=ardui&gs_lcp=Cgdnd3Mtd2l6EAMYADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BQgAELEDOgIILjoICAAQsQMQgwE6CwgAELEDEMcBEK8BOggILhCxAxCDAVCfM1iIRmDZWGgBcAB4AIAB1wGIAesHkgEFMC4yLjOYAQCgAQGqAQdnd3Mtd2l6sAEA&sclient=gws-wiz')

  }

}
