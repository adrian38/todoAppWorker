
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
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';


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
  valor_segment:string="";
  imagen_0:string="";
  imagen_1:string="";
  imagen_2:string="";
  ultimo_sms:string="";
  sms_cliente:string="";

  //-------------------------------------------------------
// yo:boolean=false;


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
             private modalCtrl   :ModalController,
             private subServ: ObtSubSService) {

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

    console.log('mi ruta ',this.subServ.getruta());
    this.valorSegment( this.subServ.getruta());
    
    this.subServ.setruta('solicitudes-chat-detalles');

    
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
           
              console.log('sms else',this.messagesList);
              this.coger();
              
						}
					}
				}
			});
		}); 
  }

  pushToChat() {

    if (this.message.message.length > 0) {
        this.message.offer_id = this.purchaseOrderID;

    
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



  onClose() {
    console.log("Close clicked");
    this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;

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

  valorSegment( ruta:string){
 if( ruta == 'tabs/tab1'){
   this.valor_segment = 'chat';
 }
 else{
  this.valor_segment = 'detalles';
 }
  }

}
