import { Component, ViewChild } from '@angular/core';
import { AlertController, IonTabButton, IonTabs } from '@ionic/angular';
import { element } from 'protractor';
import { NavController,Platform } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  @ViewChild('tabs') tabs: IonTabs;

  tab1Active = '';
  tab2Active = '';
  tab3Active = '';

  constructor(private navController : NavController,
              private platform      : Platform,
              public alertCtrl      : AlertController) {}

  setCurrentTab( event ) {
    const selectedTab = this.tabs.getSelected();
    if (selectedTab === 'tab1'){
      this.tab1Active = '_active';
      this.tab2Active = '';
      this.tab3Active = '';
      console.log('posicion',selectedTab);

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.presentAlert();
   });
     
    }
    else if (selectedTab === 'tab2'){
      this.tab1Active = '';
      this.tab2Active = '_active';
      this.tab3Active = '';
      console.log('posicion',selectedTab);

      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navController.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
   });
    }
    else if(selectedTab === 'tab3'){
      this.tab1Active = '';
      this.tab2Active = '';
      this.tab3Active = '_active';
      console.log('posicion',selectedTab);
    
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.navController.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
   });
    }
  }

  async presentAlert() {
		
    // this.loading.dismiss();  //////////////////////Probar a ver si quita las anteriores cuando doy atras
 
 
     const alert = await this.alertCtrl.create({
       cssClass: 'my-custom-class',
       header: 'Alerta',
       message: 'Desea registrarse con otro usuario',
 
       buttons: [
         {
           text: 'Cancelar',
           role: 'cancel',
           cssClass: 'secondary',
           handler: (blah) => {}
         },
         {
           text: 'Aceptar',
           handler: (datos) => {
             this.navController.navigateRoot('/login-user', { animated: true, animationDirection: 'back' });
           }
         }
       ]
     });
 
     await alert.present();
   }

}
