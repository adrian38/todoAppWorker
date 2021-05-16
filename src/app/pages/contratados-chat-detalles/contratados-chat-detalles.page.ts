import { ChatDetails } from 'src/app/Interfaces/interfaces';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';
import { IonContent, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { MessageModel } from 'src/app/models/message.model';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-contratados-chat-detalles',
  templateUrl: './contratados-chat-detalles.page.html',
  styleUrls: ['./contratados-chat-detalles.page.scss'],
})
export class ContratadosChatDetallesPage implements OnInit {

  presupuesto: number;
  display:boolean=false;
  task: TaskModel;
  message: MessageModel;
	messagesList: MessageModel[];
  user: UsuarioModel;  
  messagesList$: Observable<MessageModel[]>;
	messageSendOk$: Observable<MessageModel>;
	task$: Observable<TaskModel[]>;
	notificationNewMessg$: Observable<number[]>;

	subscriptionMessList: Subscription;
	subscriptionNewMsg: Subscription;
	subscriptionNotification: Subscription;
	subscriptionTask: Subscription;


  habilitar_0:boolean;
  habilitar_1:boolean;
  habilitar_2:boolean;
  imagen_0:string="";
  imagen_1:string="";
  imagen_2:string="";
  valor_segment:string="";
  ultimo_sms:string="";
  sms_cliente:string="";

  loading: HTMLIonLoadingElement = null;

  @ViewChild(IonContent) content: IonContent;
 

  constructor(private _taskOdoo  :TaskOdooService,
              private navCtrl    :NavController,
              private datos      :ObtSubSService,
              private modalCtrl  :ModalController,
              private platform   : Platform,
              private _chatOdoo  : ChatOdooService,
              private _authOdoo  : AuthOdooService,
              private ngZone     : NgZone,
              public loadingController: LoadingController) {


                this.task = new TaskModel();
                this.task = this._taskOdoo.getTaskCesar();
                this.user = this._authOdoo.getUser();
                this.message = new MessageModel();
                this.messagesList = [];
                 
               }

  ngOnInit() {

    this.presupuesto = this.task.materials + this.task.materials;
    this.valorSegment( this.datos.getruta());
    this.datos.setruta('contratados-chat-detalles');
    this.ver_imagenes();
    this.presentLoading();
    this._chatOdoo.requestAllMessages(this.task.id);
    this.subscriptions();
 
  }

  ngOnDestroy() {
    this.subscriptionMessList.unsubscribe();
    this.subscriptionNewMsg.unsubscribe();
    this.subscriptionNotification.unsubscribe();
    this._taskOdoo.setChat(false);

  }

  subscriptions() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {
        animated: true,
        animationDirection: 'back',
      });
    });

    this.messageSendOk$ = this._chatOdoo.getRequestedNotificationSendMessage$();
    this.subscriptionNewMsg = this.messageSendOk$.subscribe((messageSendOk) => {
      this.ngZone.run(() => {
        
          messageSendOk.author = this.user.realname;
          messageSendOk.author_id = this.user.partner_id;
          this.messagesList.push(messageSendOk);
        
      });
    });

    this.notificationNewMessg$ =
      this._taskOdoo.getRequestedNotificationNewMessg$();
    this.subscriptionNotification = this.subscriptionNotification =
      this.notificationNewMessg$.subscribe((notificationNewMessg) => {
        this.ngZone.run(() => {
          this._chatOdoo.requestNewMessage(notificationNewMessg);
        });
      });

    this.messagesList$ = this._chatOdoo.getAllMessages$();
    this.subscriptionMessList = this.messagesList$.subscribe((messagesList) => {
      this.ngZone.run(() => {

        let temp = messagesList.find((element) => element.offer_id);
				if (temp) {
					if (this.task.id === temp.offer_id) {
						if (typeof this.messagesList !== 'undefined' && this.messagesList.length > 0) {
							Array.prototype.push.apply(this.messagesList, messagesList);
						} else {
							this.messagesList = messagesList;
						}
					}
				}
              
        this.coger();
        this.loading.dismiss();
              
          });
         });
    

    this._taskOdoo.setChat(true);
  }



  coger(){
    console.log('ultimo sms',this.messagesList[0].message )
     console.log('ultimo sms',this.messagesList[0].author_id )
     console.log('ultimovvv sms',this.user.partner_id )

for (let i = 0; i <  this.messagesList.length; i++) {

if(this.messagesList[i].author_id != this.user.partner_id ){
     this.sms_cliente = this.messagesList[i].message;
     console.log('ultimo sms temporal', this.sms_cliente);
}
else{
console.log('nooooo');
}

} 

}

  onClickUbicacion(  ) {
    this.datos.setcalle(this.task.address.street);
    this.datos.setnumero(this.task.address.number);
    this.datos.setruta('contratados-chat-detalles');
    this.navCtrl.navigateRoot('/mapa', { animated: true, animationDirection: 'forward' }); 
  }

  onClickCostoEntrada(  ) {
    this.navCtrl.navigateRoot('/costo-extra', { animated: true, animationDirection: 'forward' }); 

  }

  onClickFactura( event ) {
    
    this.navCtrl.navigateRoot('/factura-servicios', { animated: true, animationDirection: 'forward' }); 
  }

  onClickDenunciar( event ) {
    console.log('Denunciar clicked');
   this.display=true;
  }

  onClickFinalizar( event ) {
    console.log('Finalizar clicked');
  }

  onClose() {
    console.log("Close clicked¿¿¿¿¿");
    this.navCtrl.navigateRoot('/tabs/tab2', {animated: true, animationDirection: 'back' }) ;
  }

  pushToChat() {

    if (this.message.message.length > 0) {
        this.message.offer_id = this.task.id;

    
      this._chatOdoo.sendMessageClient(this.message);
      this.ultimo_sms=this.message.message;
      console.log('´sms mandado', this.message.message);
      this.message = new MessageModel();
    }

    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 500);

    this.message.message= '';
}



  ver_imagenes(){
    console.log('ver imagen !!!!',this.task.photoNewTaskArray);

    if (
      typeof this.task.photoNewTaskArray !== 'undefined' && this.task.photoNewTaskArray.length == 0) 
      {
        this.imagen_0="../../../assets/icons/noImage.svg ";
        this.imagen_1="../../../assets/icons/noImage.svg ";
        this.imagen_2="../../../assets/icons/noImage.svg ";
        this.habilitar_0=true;
        this.habilitar_1=true;
        this.habilitar_2=true;
      }
    /*    if (this.task.photoNewTaskArray.length == 0)
        {
          this.imagen_0="../../../assets/icons/noImage.svg ";
          this.imagen_1="../../../assets/icons/noImage.svg ";
          this.imagen_2="../../../assets/icons/noImage.svg ";
          this.habilitar_0=true;
          this.habilitar_1=true;
          this.habilitar_2=true;
        } */
        if (this.task.photoNewTaskArray.length == 1)
        {
          this.imagen_0= this.task.photoNewTaskArray[0];
          this.imagen_1="../../../assets/icons/noImage.svg ";
          this.imagen_2="../../../assets/icons/noImage.svg ";
          this.habilitar_0=false;
          this.habilitar_1=true;
          this.habilitar_2=true;
        }
        if (this.task.photoNewTaskArray.length == 2)
        {
          this.imagen_0= this.task.photoNewTaskArray[0];
          this.imagen_1= this.task.photoNewTaskArray[1];
          this.imagen_2="../../../assets/icons/noImage.svg ";
          this.habilitar_0=false;
          this.habilitar_1=false;
          this.habilitar_2=true;
        }
        if (this.task.photoNewTaskArray.length == 3)
        {
          this.imagen_0= this.task.photoNewTaskArray[0];
          this.imagen_1= this.task.photoNewTaskArray[1];
          this.imagen_2= this.task.photoNewTaskArray[2];
          this.habilitar_0=false;
          this.habilitar_1=false;
          this.habilitar_2=false;
        }
  }

  imageClick(imagen) {
		this.modalCtrl
			.create({
				component: ImagenmodalPage,
				componentProps: {
					imagen: imagen
				}
			})
			.then((modal) => modal.present()); 

	}

  valorSegment( ruta:string){
    if( ruta == 'tabs/tab2'){
      this.valor_segment = 'chat';
    }
    else{
     this.valor_segment = 'detalles';
    }
     }

     async presentLoading() {
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Espere...'
        //duration: 2000
      });
  
      return this.loading.present();
    }

}
