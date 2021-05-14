import { Component, NgZone } from '@angular/core';
import {AlertController,LoadingController,NavController, Platform} from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { MessageModel } from 'src/app/models/message.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  
  id_string: string;
  titulo_solicitud: string = '';
  task: TaskModel;
  solicitudesList: TaskModel[];
  tab: String;
  loading: any;
  solicitud_vacia: boolean = true;

  tasksList$: Observable<boolean>; // servicio comunicacion
  notificationNewMessg$: Observable<number[]>;
  notificationNewMessgOrigin$: Observable<MessageModel[]>;
  notificationOffertCancelled$: Observable<number[]>;
  notificationPoAcepted$: Observable<any[]>;
  notificationNewPoSuplier$: Observable<number[]>;
  notificationPoCancelled$: Observable<number[]>;

  subscriptiontasksList: Subscription;
  subscriptionNotificationMess: Subscription;
  subscriptionNotificationMessgOrigin: Subscription;
  subscriptionOffertCancelled: Subscription;
  subscriptionPoAcepted: Subscription;
  subscriptioNewPoSuplier: Subscription;
  subscriptioPoCancelled: Subscription;

  constructor(
    private subServ: ObtSubSService,
    private _taskOdoo: TaskOdooService,
    private ngZone: NgZone,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private _chatOdoo: ChatOdooService,
    private platform      : Platform,
  ) {}

  ngOnInit(): void {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this. presentAlert();
 });
   
    this.subscriptions();
    this.init();
    this._taskOdoo.setTab1In(true);
    this.subServ.setruta('tabs/tab1');

    /*  this.cantidad_solicitudes(); */
  }

  ngOnDestroy(): void {
    this.subscriptiontasksList.unsubscribe();
    this.subscriptionNotificationMess.unsubscribe();
    this.subscriptionNotificationMessgOrigin.unsubscribe();
    this.subscriptionOffertCancelled.unsubscribe();
    this.subscriptionPoAcepted.unsubscribe();
    this.subscriptioNewPoSuplier.unsubscribe();
    this.subscriptioPoCancelled.unsubscribe();

    this._taskOdoo.setTab1In(false);
  }

  init() {
    if (!this._taskOdoo.getInitTab()) {
      this._taskOdoo.setInitTab(true);
      this._taskOdoo.requestTaskListProvider();
      //this.presentLoadingCargado();
      this.presentLoadingCargado();
    } else {
      this.solicitudesList = this._taskOdoo.getSolicitudeList();
      ///////////preguntar si no hay solicitudes cuando se arregle

      if (!this._taskOdoo.getPilaEmpthy()) {
        let temp = this._taskOdoo.getPilaSolicitud();
        let tempChat: number[] = [];
        let tempNew: number[] = [];

        for (let newElement of temp) {
          this.solicitudesList = this.subServ.getSolicitudeList();

          switch (newElement.notificationType) {
            case 1:
              if (
                typeof this.solicitudesList !== 'undefined' &&
                this.solicitudesList.length > 0
              ) {
                let temp = this.solicitudesList.findIndex(
                  (element) => element.id === newElement.id
                );
                if (temp === -1) {
                  tempNew.push(newElement.id);
                }
              } else {
                tempNew.push(newElement.id);
              }

              break;

            case 2:
              /* let temp = this.solicitudesList.findIndex(
                  (element) => element.id_string === newElement.id_string
                );
                if (temp != -1) {
                  this.solicitudesList[temp].notificationOffert = true;
                } */
              break;
            case 3:
              tempChat.push(newElement.id);
              break;
          }
        }
        if (typeof tempNew !== 'undefined' && tempNew.length > 0)
          this._taskOdoo.requestTaskPoUpdate(tempNew);

        if (typeof tempNew !== 'undefined' && tempNew.length > 0)
          this._chatOdoo.requestNewMessageNoti(tempChat);
      }
    }
  }

  subscriptions() {
    /* 	this.platform.backButton.subscribeWithPriority(10, () => {
			this.loading.dismiss();
			this.presentAlert();
		}); */

    this.notificationNewMessg$ =
      this._taskOdoo.getRequestedNotificationNewMessg$();
    this.subscriptionNotificationMess = this.notificationNewMessg$.subscribe(
      (notificationNewMessg) => {
        this.ngZone.run(() => {
          this._chatOdoo.requestNewMessageNoti(notificationNewMessg);
        });
      }
    );

    this.notificationNewMessgOrigin$ =
      this._chatOdoo.getMessagesOriginNotification$(); //
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
            this.loading.dismiss();
            console.log('solicitud eliminada')
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

    this.notificationPoAcepted$ =
      this._taskOdoo.getRequestedNotificationPoAcepted$();
    this.subscriptionPoAcepted = this.notificationPoAcepted$.subscribe(
      (notificationPoAcepted) => {
        this.ngZone.run(() => {
          console.log(notificationPoAcepted, 'notificacionaceptada');
          /*         for (let Po_id of notificationPoAcepted){
			console.log("PO Cancelled por notificacionOffert");
			let temp = (this.solicitudesList.findIndex(element => element.id === Po_id ));
			if(temp !== -1){
			this.solicitudesList.splice(temp, 1);
			}
			} */
        });
      }
    );

    this.tasksList$ = this._taskOdoo.getRequestedTaskList$();
    this.subscriptiontasksList = this.tasksList$.subscribe(
      (tasksList: boolean) => {
        this.ngZone.run(() => {

          
          if (tasksList) {
            this.solicitudesList = this._taskOdoo.getSolicitudeList();
            this.loading.dismiss();
          }
          //this.solicitudEmpty();
        });
      }
    );
  }

  solicitudEmpty() {
    if (
      typeof this.solicitudesList !== 'undefined' &&
      this.solicitudesList.length > 0
    ) {
      this.solicitud_vacia = false;
      console.log('hay solcitud');
    } else {
      this.solicitud_vacia = true;
      console.log(' no hay solcitud');
    }
  }

  in(i) {
    this.task = this.solicitudesList[i];
    this._taskOdoo.setTaskCesar(this.task);
    this._chatOdoo.setIdPo(this.task.id);

    if (this.task.offer_send == 'sent') {
      this.navCtrl.navigateRoot('/solicitudes-chat-detalles', {
        animated: true,
        animationDirection: 'forward',
      });
    } else {
      this.navCtrl.navigateRoot('/presupuestar', {
        animated: true,
        animationDirection: 'forward',
      });
    }
  }

  cancelar(i) {
    this._taskOdoo.cancelPOsuplier(this.solicitudesList[i].id);
    /////////////////////////////////////////////////poner cargado;
    this.presentLoading();
  }

   /*  cantidad_solicitudes(){
     
    if (this.solicitudesList.length < 1) {
      this.solicitud_vacia=true;
      }
      else{
        this.solicitud_vacia=false;
      } 
    } */

    
      tituloSolicitud(i){
        
        this.titulo_solicitud=this.solicitudesList[i].title;
        if (this.titulo_solicitud.length <16){
          return this.titulo_solicitud;
        }
        else {
          return  this.titulo_solicitud.slice(0,15) + " ... ";
          }
      }

      async presentLoadingCargado() {
        this.loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Cargando Solicitudes...'
          //duration: 2000
        });
        return this.loading.present();
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
                this.navCtrl.navigateRoot('/login-user', { animated: true, animationDirection: 'back' });
              }
            }
          ]
        });
    
        await alert.present();
      }

      async presentLoading() {
        this.loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Eliminando Solicitud...'
          //duration: 2000
        });
    
        return this.loading.present();
      }

      onFabClick(  ){
        this.navCtrl.navigateRoot('/crear-promocion', { animated: true, animationDirection: 'back' });
              
      }
}
