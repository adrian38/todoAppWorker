import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SignUpOdooService } from 'src/app/services/signup-odoo.service';
import { Observable, Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
  providers: [MessageService]
})
export class StripePage implements OnInit {


  punto_naranja = '../../assets/icons/punto_naranja.svg';
  punto_gris = '../../assets/icons/punto_gris.svg';

  notificationLink$: Observable<string>;
	notificationError$: Observable<boolean>;

	subscriptionError: Subscription;
	subscriptionOk: Subscription;

  loading: HTMLIonLoadingElement = null;
  
  constructor( private navCtrl: NavController,
               private platform: Platform,
               private browser  :InAppBrowser,
               private _sigupOdoo :SignUpOdooService,
               private ngZone: NgZone, 
               private messageService: MessageService,
               public loadingController: LoadingController,
               private toastController: ToastController,) { }

  ngOnInit() {



    this.platform.backButton.subscribeWithPriority(10, () => {

      this.navCtrl.navigateRoot('/login-user', {animated: true, animationDirection: 'back' }) ;

    });


    this.notificationError$ = this._sigupOdoo.getNotificationError$();
      this.subscriptionError = this.notificationError$.subscribe((notificationError) => {
        this.ngZone.run(() => {
          if (notificationError) {
        
            
            this.loading.dismiss();
            //this.presentToast("Error generando su link, vuelva a intentarlo");
            this.messageService.add({ severity: 'error', detail: 'Error generando su link, vuelva a intentarlo' });
            
          }
        });
      });
      this.notificationLink$ = this._sigupOdoo.getNotificationLink$();
      this.subscriptionOk = this.notificationLink$.subscribe((notificationLink) => {
        this.ngZone.run(() => {
          
           //this._sigupOdoo.notificationPull();

            this.loading.dismiss();
           
            this.browser.create(notificationLink);

            

           
    
          
        });
      });


  }
  // async presentToast(message:string) {
	// 	const toast = await this.toastController.create({
	// 		message: message,
	// 		duration: 2000
	// 	});
	// 	toast.present();
	// }

  async presentLoading(sms) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: sms,
      
      //duration:4000
    });

    return this.loading.present();

  }


  ngOnDestroy(): void {
		//Called once, before the instance is destroyed.
		//Add 'implements OnDestroy' to the class.
		this.subscriptionOk.unsubscribe();
		this.subscriptionError.unsubscribe();
	}

  openUrl(){
    
    this._sigupOdoo.getStripeLink();
    this.presentLoading("Espere mientras generamos su link de stripe");

   

  }

}
