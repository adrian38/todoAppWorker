
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';
import { NavController,Platform ,IonContent, ModalController} from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ChatDetails } from 'src/app/Interfaces/interfaces';
import { MessageModel } from 'src/app/models/message.model';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';


@Component({
  selector: 'app-solicitudes-chat-detalles',
  templateUrl: './solicitudes-chat-detalles.page.html',
  styleUrls: ['./solicitudes-chat-detalles.page.scss'],
})

export class SolicitudesChatDetallesPage implements OnInit {

  task: TaskModel;

	message: MessageModel;
	messagesList: MessageModel[];

	messagesList$: Observable<MessageModel[]>;
	messageSendOk$: Observable<MessageModel>;
	task$: Observable<TaskModel[]>;
	notificationNewMessg$: Observable<number[]>;

	subscriptionMessList: Subscription;
	subscriptionNewMsg: Subscription;
	subscriptionNotification: Subscription;
	subscriptionTask: Subscription;

	user: UsuarioModel;
  purchaseOrderID: number;

  habilitar_0:boolean;
  habilitar_1:boolean;
  habilitar_2:boolean;
  imagen_0:string="";
  imagen_1:string="";
  imagen_2:string="";
  ultimo_sms:string="";
  sms_cliente:string="";

  //-------------------------------------------------------
yo:boolean=false;

  categoria: string;
  presupuesto: number;
  descripcion: string;
  fecha: string;
  horario: string;
  direccion: string;
  materiales: number;
  manoObra: number;
  fotos: string [];

  total: number;


  chats: ChatDetails[] = [];
  newMessage: string;

  isLastMessage:boolean=true;

  @ViewChild(IonContent) content: IonContent;


  constructor(private _taskOdoo    : TaskOdooService,
             private navCtrl : NavController,
             private platform      : Platform,
             private ngZone: NgZone,
             private _chatOdoo: ChatOdooService,
             private _authOdoo: AuthOdooService,
             private modalCtrl   :ModalController) {

            this.task = new TaskModel();

		this.task = this._taskOdoo.getTaskCesar();
    console.log('tarea',this.task);
    
		this.user = this._authOdoo.getUser();
    console.log('usuario',this.user);
		this.message = new MessageModel();
		this.messagesList = [];
    
		this.purchaseOrderID = this._chatOdoo.getIdPo();
    console.log('purchaseOrderID',this.purchaseOrderID);
		this._taskOdoo.requestTask(this.purchaseOrderID);
		this._chatOdoo.requestAllMessages(this.purchaseOrderID); 
              }

  ngOnInit() {

    
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
 });

    

   
   // console.log('sms',this.messagesList);
    

    this.presupuesto = this.task.budget;
    this.categoria = 'FONTANERIA';
    this.descripcion = this.task.title;
   
    this.materiales = 28;
    this.manoObra = 54;
    this.total = this.materiales + this.manoObra;

    this.ver_imagenes();

   /*  setTimeout(() => {
      let simulatedChat: ChatDetails = 
        {
          userID: "Juan Perez",
          timeStamp: Date.now(),
          isLastMessage: false,
          message: 'Hola, como estas?? Quisiera ver si se puede pasar la oferta para el Viernes por la mañana.',
          date: ""
        };

      this.unshiftChat(simulatedChat);

      simulatedChat =
        {
          userID: "Juan Perez",
          timeStamp: Date.now(),
          isLastMessage: false,
          message: 'Si pudieras venir el viernes a las 10am seria lo mejor, a esa hora no tengo compromisos',
          date: ""
        };

      this.unshiftChat(simulatedChat);

      simulatedChat =
        {
          userID: "Juan Perez",
          timeStamp: Date.now(),
          isLastMessage: true,
          message: 'Ok, saludos',
          date: ""
        };

      this.unshiftChat(simulatedChat);

    }, 8000); */

 
    this.messageSendOk$ = this._chatOdoo.getRequestedNotificationSendMessage$();
		this.subscriptionNewMsg = this.messageSendOk$.subscribe((messageSendOk) => {
			this.ngZone.run(() => {
				if (messageSendOk.offer_id === this.purchaseOrderID) {
					messageSendOk.author = this.user.realname;
					messageSendOk.author_id = this.user.partner_id;
					this.messagesList.push(messageSendOk);
				}
			});
		});

		this.notificationNewMessg$ = this._taskOdoo.getRequestedNotificationNewMessg$();
		this.subscriptionNotification = this.subscriptionNotification = this.notificationNewMessg$.subscribe(
			(notificationNewMessg) => {
				this.ngZone.run(() => {
					this._chatOdoo.requestNewMessage(notificationNewMessg);
				});
			}
		);

		this.messagesList$ = this._chatOdoo.getAllMessages$();
		this.subscriptionMessList = this.messagesList$.subscribe((messagesList) => {
			this.ngZone.run(() => {
		
				let temp = messagesList.find((element) => element.offer_id);
				if (temp) {
					if (this.purchaseOrderID === temp.offer_id) {
						if (typeof this.messagesList !== 'undefined' && this.messagesList.length > 0) {
							Array.prototype.push.apply(this.messagesList, messagesList);
              console.log('sms if',this.messagesList);						
            } else {
							this.messagesList = messagesList;
              /* this.yo=false; */
              console.log('sms else',this.messagesList);
              this.coger();
              
						}
					}
				}
			});
		}); 
  }

  pushToChat() {

    /* if(this.newMessage.length === 0)
    {
      return;
    } */
    
 /*     const newChat: ChatDetails =
    {
      userID: "Me",
      timeStamp: Date.now(),
      isLastMessage: true,
      message: this.newMessage,
      date: ""
    };  */

    //Se limpian las banderas de ultimo mensaje
  /*     for(let i = 0; i < this.messagesList.length; i++) {
        console.log('for0',this.messagesList.length);
        console.log('for1',this.message);
      if(this.chats[i].userID ===this.purchaseOrderID.toString() ) {
        this.chats[i].isLastMessage = false;
      } 

   

 


    }  */ 

    //this.unshiftChat(this.messages);

    if (this.message.message.length > 0) {
        this.message.offer_id = this.purchaseOrderID;
        //this.yo=true;
        //this.isLastMessage=true;
    
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

/*   unshiftChat(chat: ChatDetails) {
    let currentTime = Date.now();
    let strTime = new Date(currentTime).toLocaleString();

    chat.date = strTime;

    this.chats.unshift(chat);
  } */

  onClose() {
    console.log("Close clicked");
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

}
