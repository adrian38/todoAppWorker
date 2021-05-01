import { Component, NgZone } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
  Platform,
} from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
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
  cant;
  id_string: string;
  titulo: string = '';
  task: TaskModel;
  solicitudesList: TaskModel[];
  tab: String;
  loading: any;
  solicitudVacia: boolean = true;

  tasksList$: Observable<boolean>; // servicio comunicacion
  notificationNewMessg$: Observable<number[]>;
  notificationNewMessgOrigin$: Observable<MessageModel[]>;

  subscriptiontasksList: Subscription;
  subscriptionNotificationMess: Subscription;
  subscriptionNotificationMessgOrigin: Subscription;

  constructor(
    private subServ: ObtSubSService,
    private _taskOdoo: TaskOdooService,
    private ngZone: NgZone,
    public navCtrl: NavController,
    private platform: Platform,
    public alertCtrl: AlertController,
    private messageService: MessageService,
    public loadingController: LoadingController,
    //private _location: Location,
    private _chatOdoo: ChatOdooService
  ) {}

  ngOnInit(): void {
    this.subscriptions();
    this.init();
    this._taskOdoo.setTab1In(true);

    /* 	if( this.task.title.length < 11){
		this.titulo=this.task.title;
	   }
	   else{
		this.titulo=this.task.title.slice(0,10) + " " + " . . .";
	   } */

    /* if( this.task.title.length < 11){
		this.titulo=this.task.title;
		console.log("if",this.titulo);
	}
	   else{
		this.titulo=this.task.title.slice(0,10) + " " + " . . .";
		console.log("else",this.titulo);
	   }  */
  }

  ngOnDestroy(): void {
	this.subscriptiontasksList.unsubscribe();
	this.subscriptionNotificationMess.unsubscribe();
	this.subscriptionNotificationMessgOrigin.unsubscribe();
	  
    this._taskOdoo.setTab1In(false);
  }

  init() {
    if (!this._taskOdoo.getInitTab()) {
      this._taskOdoo.setInitTab(true);
      this._taskOdoo.requestTaskListProvider();
      //this.presentLoadingCargado();
    } else {
      this.solicitudesList = this._taskOdoo.getSolicitudeList();
	  this.solicitudEmpty();
	  this.solicitudEmpty();
			if(!this.solicitudVacia){
		
				if (!this._taskOdoo.getPilaEmpthy()) {
					let temp = this._taskOdoo.getPilaSolicitud();
					this._chatOdoo.requestNewMessageNoti(temp);
				}
			}
    }
  }

  subscriptions() {
    /* 	this.platform.backButton.subscribeWithPriority(10, () => {
			this.loading.dismiss();
			this.presentAlert();
		}); */

    this.notificationNewMessg$ = this._taskOdoo.getRequestedNotificationNewMessg$();
    this.subscriptionNotificationMess = this.notificationNewMessg$.subscribe(
      (notificationNewMessg) => {
        this.ngZone.run(() => {
          this._chatOdoo.requestNewMessageNoti(notificationNewMessg);
        });
      }
    );

    this.notificationNewMessgOrigin$ = this._chatOdoo.getMessagesOriginNotification$(); //
    this.subscriptionNotificationMessgOrigin = this.notificationNewMessgOrigin$.subscribe(
      (notificationNewMessg) => {
        this.ngZone.run(() => {

		

           for (let i = 0; i < notificationNewMessg.length; i++) {
            let temp = this.solicitudesList.findIndex(
              (element) =>
                element.id === notificationNewMessg[i].offer_id
            );
            if (temp != -1) {
              this.solicitudesList[temp].notificationChat = true;
            }
          } 
        });
      }
    );

    /* this.notificationSOCancelled$ = this._taskOdoo.getNotificationSoCancelled$();
		this.subscriptionNotificationSoCancel = this.notificationSOCancelled$.subscribe((notificationCancel) => {
			this.ngZone.run(() => {
				//////////////////////////////////////eliminar cargando

				let temp = this.solicitudesList.findIndex((element) => element.id === notificationCancel);
				if (temp !== -1) {
					this.solicitudesList.splice(temp, 1);
					
				}

				this.loading.dismiss();
				this.messageService.add({ severity: 'error', detail: 'Solicitud eliminada' });
			});
		}); */

    this.tasksList$ = this._taskOdoo.getRequestedTaskList$();
    this.subscriptiontasksList = this.tasksList$.subscribe(
      (tasksList: boolean) => {
        this.ngZone.run(() => {
          if (tasksList) {
            this.solicitudesList = this._taskOdoo.getSolicitudeList();
          }
        });
      }
    );
  }

  solicitudEmpty() {
    if (
      typeof this.solicitudesList !== 'undefined' &&
      this.solicitudesList.length > 0
    ) {
      this.solicitudVacia = false;
    } else {
      this.solicitudVacia = true;
    }
  }

  in(i) {
    this.task = this.solicitudesList[i];
    console.log(this.task.offer_send);
    this._taskOdoo.setTaskCesar(this.task);

    if (this.task.offer_send == 'send' ){
      console.log("ya esta presupuestado");
      this.navCtrl.navigateRoot('/solicitudes-chat-detalles', { animated: true,animationDirection: 'forward',});
    }
    else{
      this.navCtrl.navigateRoot('/presupuestar', { animated: true,animationDirection: 'forward',});
    }
    
  }

  /* 	reducir(title){
		if( title.length < 11){
			this.titulo=title;
		   }
		   else{
			this.titulo=title.slice(0,10) + " " + " . . .";
		   }
	} */
  cancelar(i){
    console.log("borro",i);
  }
}
