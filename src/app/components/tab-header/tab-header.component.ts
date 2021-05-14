import { Component, Input, NgZone, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
})
export class TabHeaderComponent implements OnInit {
  @Input() titulo: string;
  @Input() backgroundColor: string = '';

  notification: boolean = false;
  notification$: Observable<boolean>;
  subscriptionNotification:Subscription;

  ruta:string = '';

  constructor(private navCtrl: NavController,
              private _taskOdoo: TaskOdooService,
              private ngZone: NgZone,
              private subServ: ObtSubSService) {

              }

  ngOnInit() {
    const elemento = document.getElementById('div_back');
    this.subscriptions();

    if (this.backgroundColor !== '') {
      elemento.style.backgroundColor = this.backgroundColor;
    }
  }

  ngOnDestroy(){
    this.subscriptionNotification.unsubscribe();

  }

  subscriptions() {
  this.notification$ = this._taskOdoo.getNotifications$();
    this.subscriptionNotification = this.notification$.subscribe(
      (notiAlert: boolean) => {
        this.ngZone.run(() => {

          if (notiAlert) {
           this.notification=true;
          }
       
        });
      }
    );
  }

  on_Click() {
    console.log('click nuevament');
  }
  OnClickNotificaciones(){
    console.log('click campana');
    console.log('mi ruta',this.subServ.getruta());
    
    this.navCtrl.navigateRoot('/notificaciones', {animated: true, animationDirection: 'forward' }) ;


  }
}
