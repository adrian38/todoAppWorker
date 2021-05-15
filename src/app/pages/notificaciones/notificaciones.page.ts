import { Component, NgZone, OnInit } from '@angular/core';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { MessageModel } from 'src/app/models/message.model';
import { TaskModel } from 'src/app/models/task.model';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  notificationNewMessg$: Observable<number[]>;
  notificationNewMessgOrigin$: Observable<MessageModel[]>;
  notificationOffertCancelled$: Observable<number[]>;
  notificationPoAcepted$: Observable<any[]>;
  notificationNewPoSuplier$: Observable<number[]>;
  notificationPoCancelled$: Observable<number[]>;

  subscriptionNotificationMess: Subscription;
  subscriptionNotificationMessgOrigin: Subscription;
  subscriptionOffertCancelled: Subscription;
  subscriptionPoAcepted: Subscription;
  subscriptioNewPoSuplier: Subscription;
  subscriptioPoCancelled: Subscription;

  constructor(
    private _taskOdoo: TaskOdooService,
    private ngZone: NgZone,
    private _chatOdoo: ChatOdooService
  ) {}

  ngOnInit() {

    //this.subscriptions();

    
  }
  ngOnDestroy() {
    this.subscriptionNotificationMess.unsubscribe();
    this.subscriptionNotificationMessgOrigin.unsubscribe();
    this.subscriptionOffertCancelled.unsubscribe();
    this.subscriptionPoAcepted.unsubscribe();
    this.subscriptioNewPoSuplier.unsubscribe();
    this.subscriptioPoCancelled.unsubscribe(); 
  }

   subscriptions() {
    
    this.notificationNewMessg$ =
      this._taskOdoo.getRequestedNotificationNewMessg$();
    this.subscriptionNotificationMess = this.notificationNewMessg$.subscribe(
      (notificationNewMessg) => {
        this.ngZone.run(() => {
          this._chatOdoo.requestNewMessageNoti(notificationNewMessg);
        });
      }
    );

    /* this.notificationNewMessgOrigin$ = this._chatOdoo.getMessagesOriginNotification$(); //
    this.subscriptionNotificationMessgOrigin =
      this.notificationNewMessgOrigin$.subscribe((notificationNewMessg) => {
        this.ngZone.run(() => {
          for (let i = 0; i < notificationNewMessg.length; i++) {
            let temp = this.solicitudesList.findIndex(
              (element) => element.id === notificationNewMessg[i].offer_id
            );
            if (temp != -1) {
              this.solicitudesList[temp].notificationChat = true;
            }
          }
        });
      });

    this.notificationNewPoSuplier$ =
      this._taskOdoo.getRequestedNotificationNewPoSuplier$();
    this.subscriptioNewPoSuplier = this.notificationNewPoSuplier$.subscribe(
      (notificationNewPoSuplier: number[]) => {
        this.ngZone.run(() => {
          if (
            typeof this.solicitudesList !== 'undefined' &&
            this.solicitudesList.length > 0
          ) {
            for (let Po_id of notificationNewPoSuplier) {
              let temp = this.solicitudesList.findIndex(
                (element) => element.id === Po_id
              );
              if (temp !== -1) {
                notificationNewPoSuplier.splice(temp, 1);
              }
            }
          }
          this._taskOdoo.requestTaskPoUpdate(notificationNewPoSuplier);
        });
      }
    );

    ////////////////////////////////////////////////esto es para cancelar la solicitud  de provider
    this.notificationPoCancelled$ =
      this._taskOdoo.getRequestedNotificationPoCancelled$();
    this.subscriptioPoCancelled = this.notificationPoCancelled$.subscribe(
      (notificationPoCancelled) => {
        this.ngZone.run(() => {
          for (let Po_id of notificationPoCancelled) {
            console.log(
              notificationPoCancelled,
              'PO Cancelled por notificacion'
            );
            let temp = this.solicitudesList.findIndex(
              (element) => element.id === Po_id
            );
            if (temp !== -1) {
              this.solicitudesList.splice(temp, 1);
            }
          }
        });
      }
    );
    //////////////////////////////////////////////////////////////////////////////

    this.notificationOffertCancelled$ =
      this._taskOdoo.getRequestedNotificationOffertCancelled$();
    this.subscriptionOffertCancelled =
      this.notificationOffertCancelled$.subscribe(
        (notificationOffertCancelled) => {
          this.ngZone.run(() => {
            if (
              typeof this.solicitudesList !== 'undefined' &&
              this.solicitudesList.length > 0
            ) {
              for (let Po_id of notificationOffertCancelled) {
                let temp = this.solicitudesList.findIndex(
                  (element) => element.id === Po_id
                );
                if (temp !== -1) {
                  this.solicitudesList.splice(temp, 1);
                }
              }
            }
          });
        }
      );
 */
    this.notificationPoAcepted$ = this._taskOdoo.getRequestedNotificationPoAcepted$();
    this.subscriptionPoAcepted = this.notificationPoAcepted$.subscribe(
      (notificationPoAcepted) => {
        this.ngZone.run(() => {
          console.log(notificationPoAcepted, 'notificacionaceptada');
        
        });
      }
    );
  } 
}
