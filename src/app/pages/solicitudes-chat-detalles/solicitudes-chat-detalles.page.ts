import { Component, NgZone, OnInit, ViewChild, ElementRef, NgModule } from '@angular/core';
import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';
import { NavController, Platform, IonContent, ModalController, LoadingController, AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ChatDetails } from 'src/app/Interfaces/interfaces';
import { MessageModel } from 'src/app/models/message.model';
import { TaskModel } from 'src/app/models/task.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

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
  notificationNewMessg$: Observable<number[]>;

  subscriptionMessList: Subscription;
  subscriptionNewMsg: Subscription;
  subscriptionNotification: Subscription;


  user: UsuarioModel;

  habilitar_0: boolean;
  habilitar_1: boolean;
  habilitar_2: boolean;
  valor_segment: string = '';
  imagen_0: string = '';
  imagen_1: string = '';
  imagen_2: string = '';
  ultimo_sms: string = '';
  sms_cliente: string = '';
  chat_vacia: boolean = false;
  mano_obra: string = "";
  materiales: string = "";

  temp_mano_obra: number = 0;
  temp_materiales: number = 0;

  //-------------------------------------------------------


  categoria: string;
  presupuesto: number;
  descripcion: string;
  fotos: string[];
  total: number;
  chats: ChatDetails[] = [];
  newMessage: string;
  loading: HTMLIonLoadingElement = null;
  isLastMessage: boolean = true;


  notificationSendOffertOk$ = new Observable<number>();

  subscriptioSendOffertOk: Subscription;


  @ViewChild(IonContent) content: IonContent;
  @ViewChild('target') private myScrollContainer: ElementRef;

  constructor(
    private _taskOdoo: TaskOdooService,
    private navCtrl: NavController,
    private platform: Platform,
    private ngZone: NgZone,
    private _chatOdoo: ChatOdooService,
    private _authOdoo: AuthOdooService,
    private modalCtrl: ModalController,
    private subServ: ObtSubSService,
    public loadingController: LoadingController,
    private screenOrientation: ScreenOrientation,
    public alertCtrl: AlertController
  ) {
    this.task = new TaskModel();
    this.task = this._taskOdoo.getTaskCesar();
    this.user = this._authOdoo.getUser();
    this.message = new MessageModel();
    this.messagesList = [];

  }

  ngOnInit() {
    this.screenOrientation.lock('portrait');
    this._taskOdoo.setTaskNewOff(this.task.id)
    console.log(this.task, 'entre a la detalles');
    this.presupuesto = this.task.materials + this.task.work_force;
    this.categoria = this.task.type;
    this.descripcion = this.task.title;

    this.valorSegment(this.subServ.getruta());

    this.subServ.setruta('solicitudes-chat-detalles');

    this.presentLoading();
    this._chatOdoo.requestAllMessages(this.task.id);

    this.subscriptions();

    this.ver_imagenes();


  }


  testOnScroll(event: any): void {

    console.log('scroll');


  }

  scrollToBottom() {

    if (this.valor_segment === "chat") {

      setTimeout(() => {
        this.scrollToElement();
      }, 400);
    }

  }

  ngOnDestroy(): void {

    this.subscriptionMessList.unsubscribe();
    this.subscriptionNewMsg.unsubscribe();
    this.subscriptionNotification.unsubscribe();
    this.subscriptioSendOffertOk.unsubscribe();


  }

  pushToChat() {
    if (this.message.message.length > 0) {
      this.message.offer_id = this.task.id;
      this._chatOdoo.sendMessageClient(this.message);

      this.ultimo_sms = this.message.message;
      this.message = new MessageModel();
      this.coger();
    }
  }

  scrollToElement(): void {

    if (this.myScrollContainer) {

      this.myScrollContainer.nativeElement.scroll({
        top: this.myScrollContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });

    }

  }

  subscriptions() {


    this.notificationSendOffertOk$ = this._taskOdoo.getnotificationSendOffertOk$();
    this.subscriptioSendOffertOk = this.notificationSendOffertOk$.subscribe((PoId) => {
      this.ngZone.run(() => {
        console.log('Se envio la oferta correctamente');

        // this.loading_presupuesto.dismiss();
        // this.presentAlert();///////////

      });
    });



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

          this.coger();

        }
        this.chatVacia(this.messagesList.length);
        this.loading.dismiss();


      });
    });


    this._taskOdoo.setChat(true);
  }

  onClose() {
    console.log('Close clicked');
    this.navCtrl.navigateRoot('/tabs/tab1', {
      animated: true,
      animationDirection: 'back',
    });
  }

  ver_imagenes() {
    console.log('ver imagen !!!!', this.task.photoNewTaskArray);

    if (
      typeof this.task.photoNewTaskArray !== 'undefined' &&
      this.task.photoNewTaskArray.length == 0
    ) {
      this.imagen_0 = '../../../assets/icons/noImage.svg ';
      this.imagen_1 = '../../../assets/icons/noImage.svg ';
      this.imagen_2 = '../../../assets/icons/noImage.svg ';
      this.habilitar_0 = true;
      this.habilitar_1 = true;
      this.habilitar_2 = true;
    }

    if (this.task.photoNewTaskArray.length == 1) {
      this.imagen_0 = this.task.photoNewTaskArray[0];
      this.imagen_1 = '../../../assets/icons/noImage.svg ';
      this.imagen_2 = '../../../assets/icons/noImage.svg ';
      this.habilitar_0 = false;
      this.habilitar_1 = true;
      this.habilitar_2 = true;
    }
    if (this.task.photoNewTaskArray.length == 2) {
      this.imagen_0 = this.task.photoNewTaskArray[0];
      this.imagen_1 = this.task.photoNewTaskArray[1];
      this.imagen_2 = '../../../assets/icons/noImage.svg ';
      this.habilitar_0 = false;
      this.habilitar_1 = false;
      this.habilitar_2 = true;
    }
    if (this.task.photoNewTaskArray.length == 3) {
      this.imagen_0 = this.task.photoNewTaskArray[0];
      this.imagen_1 = this.task.photoNewTaskArray[1];
      this.imagen_2 = this.task.photoNewTaskArray[2];
      this.habilitar_0 = false;
      this.habilitar_1 = false;
      this.habilitar_2 = false;
    }
  }
  imageClick(imagen) {
    this.modalCtrl
      .create({
        component: ImagenmodalPage,
        componentProps: {
          imagen: imagen,
        },
      })
      .then((modal) => modal.present());
  }
  coger() {

    for (let i = 0; i < this.messagesList.length; i++) {
      if (this.messagesList[i].author_id != this.user.partner_id) {
        this.sms_cliente = this.messagesList[i].message;
        console.log('ultimo sms temporal', this.sms_cliente);
      } else {
        console.log('nooooo');
      }


    }

    this.scrollToBottom();
    //this.scrollToElement();
    //this.scrollToElement();
    //setTimeout(this.scrollToElement,1000);
  }

  valorSegment(ruta: string) {
    if (ruta == 'tabs/tab1') {
      this.valor_segment = 'chat';
    } else {
      this.valor_segment = 'detalles';
    }
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargado chat'
      //duration: 2000
    });

    return this.loading.present();
  }

  chatVacia(cant: number) {

    if (cant == 0) {
      this.chat_vacia = true;
    }
    else {
      this.chat_vacia = false;
    }
  }


  actualizarPresupesto() {
    this.alertaPresupuesto();
  }

  async alertaPresupuesto() {
    const prompt = await this.alertCtrl.create({

      header: 'Presupuesto',
      message: "Menu de cambio",
      inputs: [
        {
          name: 'mano',
          type: 'number',
          placeholder: 'Mano de obra',
          label: 'cesar',

        },

        {
          name: 'materiales',
          type: 'number',
          placeholder: 'Materiales',
          label: 'marlyn',

        },


      ],


      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Actualizar',
          handler: data => {


            if (data.mano == "" && data.materiales == "") {
              console.log('los campos estan vacios .Debo sacar un cartel para avisar');
              this.alertaSinPresupuesto();
            }
            else {

              if (data.materiales) {

                if (this.task.materials < parseFloat(data.materiales)) {
                  this.temp_materiales = this.task.materials - parseFloat(data.materiales);

                } else {
                  this.temp_materiales = parseFloat(data.materiales);
                }
                this.task.materials = parseFloat(data.materiales);
              }

              if (data.mano) {

                if (this.task.work_force < parseFloat(data.mano)) {

                  this.temp_mano_obra = this.task.work_force - parseFloat(data.mano);

                }

                else {
                  this.temp_mano_obra = parseFloat(data.mano);
                }

                this.task.work_force = parseFloat(data.mano);
              }


              this.presupuesto = this.task.materials + this.task.work_force;



              if (this.temp_materiales !== null && this.temp_mano_obra !== null) {
                this.task.temp_materials = this.temp_materiales;
                this.task.temp_work_force = this.temp_mano_obra;
              } else if (this.temp_mano_obra !== null) {

                this.task.temp_work_force = this.temp_mano_obra;
              } else if (this.temp_materiales !== null) {

                this.task.temp_materials = this.temp_materiales;
              }

              this._taskOdoo.sendNewOffer(this.task);



              // console.log('c2',this.materiales);


            }
          }
        }

      ]
    });
    prompt.present();
  }


  async alertaSinPresupuesto() {
    const prompt = await this.alertCtrl.create({

      header: 'No se ha actualizado el presupuesto',
      message: "Debe llenar los campos",



      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },

      ]
    });
    prompt.present();
  }
}
