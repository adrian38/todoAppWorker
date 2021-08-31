import { ChatDetails } from 'src/app/Interfaces/interfaces';
import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImagenmodalPage } from '../imagenmodal/imagenmodal.page';
import { AlertController, IonContent, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';
import { MessageModel } from 'src/app/models/message.model';
import { ChatOdooService } from 'src/app/services/chat-odoo.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';
import { Observable, Subscription } from 'rxjs';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/Interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
//import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-contratados-chat-detalles',
  templateUrl: './contratados-chat-detalles.page.html',
  styleUrls: ['./contratados-chat-detalles.page.scss'],
  providers: [MessageService]
})
export class ContratadosChatDetallesPage implements OnInit {



  pre: number;
  presupuesto: number;
  display: boolean = false;
  display_presupuesto: boolean = false;
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



  habilitar_0: boolean;
  habilitar_1: boolean;
  habilitar_2: boolean;
  imagen_0: string = "";
  imagen_1: string = "";
  imagen_2: string = "";
  comentario: string = "";
  foto1: string = '../../../assets/icons/fotoadd.png';
  foto2: string = '../../../assets/icons/fotoadd.png';
  foto3: string = '../../../assets/icons/fotoadd.png';
  // foto164: string = '../../../assets/icons/fotoadd.png';
  // foto264: string = '../../../assets/icons/fotoadd.png';
  // foto364: string = '../../../assets/icons/fotoadd.png';
  foto164: string = '';
  foto264: string = '';
  foto364: string = '';
  photoProvider: string ='';
  valor_segment: string = "";
  ultimo_sms: string = "";
  sms_cliente: string = "";
  chat_vacia: boolean = false;
  ruta: string = '';
  mano_obra: string = "";
  materiales: string = "";

  loading: HTMLIonLoadingElement = null;

  @ViewChild(IonContent) content: IonContent;
  @ViewChild('target') private myScrollContainer: ElementRef;


  constructor(private _taskOdoo: TaskOdooService,
    private navCtrl: NavController,
    private datos: ObtSubSService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private _chatOdoo: ChatOdooService,
    private _authOdoo: AuthOdooService,
    private ngZone: NgZone,
    public loadingController: LoadingController,
    private alertCtrl: AlertController,
    public photoService: PhotoService,
    private messageService: MessageService,
    //private screenOrientation: ScreenOrientation
  ) {


    this.task = new TaskModel();
    this.task = this._taskOdoo.getTaskCesar();
    this.user = this._authOdoo.getUser();
    this.message = new MessageModel();
    this.messagesList = [];

  }

  ngOnInit() {
    console.log('tarea',this.task);
    this.photoProvider=this.task.photoProvider;
    if(this.photoProvider == ""){
      this.photoProvider="/assets/icons/noImage.svg";
    }
    else{
      this.photoProvider=this.task.photoProvider;
    }
    
    //this.screenOrientation.lock('portrait');

    this.ruta = this.datos.getruta();
    console.log('la ruta', this.ruta);
    this.presupuesto = this.task.materials + this.task.materials;
    this.valorSegment(this.datos.getruta());
    this.datos.setruta('contratados-chat-detalles');
    this.ver_imagenes();
    this._chatOdoo.requestAllMessages(this.task.id);
    this.subscriptions();

    if (this.ruta == 'tabs/tab2') {
      this.presentLoading();
    }
    else {
      this.ruta = '';
    }

  }

  scrollToBottom() {

    if (this.valor_segment === "chat") {

      setTimeout(() => {
        this.scrollToElement();
      }, 400);
    }

  }



  ngOnDestroy() {
    this.subscriptionMessList.unsubscribe();
    this.subscriptionNewMsg.unsubscribe();
    this.subscriptionNotification.unsubscribe();
    this._taskOdoo.setChat(false);

  }

  subscriptions() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab2', { animated: true, animationDirection: 'back', });
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

        this.chatVacia(this.messagesList.length);
      });
    });


    this._taskOdoo.setChat(true);
  }




  coger() {
    // console.log('ultimo sms',this.messagesList[0].message )
    //  console.log('ultimo sms',this.messagesList[0].author_id )
    //  console.log('ultimovvv sms',this.user.partner_id )

    for (let i = 0; i < this.messagesList.length; i++) {

      if (this.messagesList[i].author_id != this.user.partner_id) {
        this.sms_cliente = this.messagesList[i].message;
        console.log('ultimo sms temporal', this.sms_cliente);
      }
      else {
        console.log('nooooo');
      }

    }

    this.scrollToBottom();

  }

  onClickUbicacion() {
    this.datos.setcalle(this.task.address.street);
    this.datos.setnumero(this.task.address.number);
    this.datos.setruta('contratados-chat-detalles');
    this.navCtrl.navigateRoot('/mapa', { animated: true, animationDirection: 'forward' });
  }

  onClickCostoEntrada() {
    this.navCtrl.navigateRoot('/costo-extra', { animated: true, animationDirection: 'forward' });

  }

  onClickFactura() {

    this.navCtrl.navigateRoot('/factura-servicios', { animated: true, animationDirection: 'forward' });
  }

  onClickDenunciar(event) {
    console.log('Denunciar clicked');
    this.display = true;
  }

  onClickFinalizar(event) {
    console.log('Finalizar clicked');
  }

  onClose() {
    console.log("Close clicked¿¿¿¿¿");
    this.navCtrl.navigateRoot('/tabs/tab2', { animated: true, animationDirection: 'back' });
  }

  // onClickEnviar() {
  //   console.log("nnnnn")
  // }

  pushToChat() {

    if (this.message.message.length > 0) {
      this.message.offer_id = this.task.id;


      this._chatOdoo.sendMessageClient(this.message);
      this.ultimo_sms = this.message.message;
      console.log('´sms mandado', this.message.message);
      this.message = new MessageModel();
      this.coger();
    }

    /*  setTimeout(() => {
       this.content.scrollToBottom(300);
     }, 500);
 
     this.message.message= ''; */
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



  ver_imagenes() {
    console.log('ver imagen !!!!', this.task.photoNewTaskArray);

    if (
      typeof this.task.photoNewTaskArray !== 'undefined' && this.task.photoNewTaskArray.length == 0) {
      this.imagen_0 = "../../../assets/icons/noImage.svg ";
      this.imagen_1 = "../../../assets/icons/noImage.svg ";
      this.imagen_2 = "../../../assets/icons/noImage.svg ";
      this.habilitar_0 = true;
      this.habilitar_1 = true;
      this.habilitar_2 = true;
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
    if (this.task.photoNewTaskArray.length == 1) {
      this.imagen_0 = this.task.photoNewTaskArray[0];
      this.imagen_1 = "../../../assets/icons/noImage.svg ";
      this.imagen_2 = "../../../assets/icons/noImage.svg ";
      this.habilitar_0 = false;
      this.habilitar_1 = true;
      this.habilitar_2 = true;
    }
    if (this.task.photoNewTaskArray.length == 2) {
      this.imagen_0 = this.task.photoNewTaskArray[0];
      this.imagen_1 = this.task.photoNewTaskArray[1];
      this.imagen_2 = "../../../assets/icons/noImage.svg ";
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
          imagen: imagen
        }
      })
      .then((modal) => modal.present());

  }

  valorSegment(ruta: string) {
    if (ruta == 'tabs/tab2') {
      this.valor_segment = 'chat';
    }
    else {
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

  chatVacia(cant: number) {

    if (cant == 0) {
      this.chat_vacia = true;
    }
    else {
      this.chat_vacia = false;
    }
  }

  onclickFoto1(posicion) {
    this.presentAlert(posicion);
  }
  onclickFoto2(posicion) {
    this.presentAlert(posicion);
  }

  async presentAlert(posicion) {
    const alert = await this.alertCtrl.create({
      header: '¿Desea colocar una foto?',
      message: 'Selecione la opcion de camara o galeria para la foto ',
      buttons: [
        {
          text: 'Cámara',
          handler: async () => {
            let photo: Photo = await this.photoService.addNewToCamara();
            console.log("Foto", photo.webviewPath);
            if (photo) {
              if (posicion == 0) {
                this.foto1 = photo.webviewPath;
                console.log(this.foto1);
                this.foto164= this.photoService.devuelve64().slice(22);

              }
              if (posicion == 1) {
                this.foto2 = photo.webviewPath;
                console.log(this.foto2);
                this.foto264= this.photoService.devuelve64().slice(22);
              }
              if (posicion == 2) {
                this.foto3 = photo.webviewPath;
                console.log(this.foto3);
                this.foto364= this.photoService.devuelve64().slice(22);
              }

            }
          }
        },
        {
          text: 'Galería',
          handler: async () => {
            this.photoService.photos = [];
            let photos: Photo[] = await this.photoService.addNewToGallery();
            // console.log("Fotos",JSON.stringify(this.photoService.photos));

            if (photos.length == 1) {

              if (posicion == 0) {
                this.foto1 = photos[0].webviewPath;
                console.log(this.foto1);
                this.foto164= this.photoService.devuelve64().slice(22); 
              }
              if (posicion == 1) {
                this.foto2 = photos[0].webviewPath;
                //console.log(this.foto1);
                this.foto264= this.photoService.devuelve64().slice(22);
              }
              if (posicion == 2) {
                this.foto3 = photos[0].webviewPath;
                //console.log(this.foto1);
                this.foto364 = this.photoService.devuelve64().slice(22);
              }


            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (event) => {
            if (posicion == 0) {

              this.foto1 = '../../../assets/icons/fotoadd.png';
              this.foto164="";
            }
            if (posicion == 1) {

              this.foto2 = '../../../assets/icons/fotoadd.png';
              this.foto264="";
            }
            if (posicion == 2) {

              this.foto3 = '../../../assets/icons/fotoadd.png';
              this.foto364="";
            }



            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  }

  actualizarPresupesto() {
    this.display_presupuesto = true;
    //this.alertaPresupuesto();
    console.log('editar')
  }

  cancelar(){
    this.display_presupuesto = false; 
  }

  // async alertaPresupuesto() {
  //   const prompt = await this.alertCtrl.create({

  //     header: 'Costos Extras',
  //     message: "Menu de cambio",
  //     inputs: [
  //       {
  //         name: 'mano',
  //         type: 'number',
  //         placeholder: 'Mano de obra',
  //         label: 'cesar',

  //       },

  //       {
  //         name: 'materiales',
  //         type: 'number',
  //         placeholder: 'Materiales',
  //         label: 'marlyn',

  //       },


  //     ],


  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Actualizar',
  //         handler: data => {


  //           if (data.mano == "" || data.materiales == "") {
  //             console.log('los campos estan vacios .Debo sacar un cartel para avisar');
  //             this.alertaSinPresupuesto();
  //           }
  //           else {
  //             this.mano_obra = data.mano;
  //             this.materiales = data.materiales;
  //           }

  //           // console.log('c2',this.materiales);


  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  actualizar(){
    if (this.mano_obra == "" || this.materiales == "") {
                  console.log('los campos estan vacios .Debo sacar un cartel para avisar');
                  this.display_presupuesto = false; 
                  this.alertaSinPresupuesto();
                }
                else {
                  console.log('mano', this.mano_obra);
                  console.log('mater',this.materiales);
                  this.display_presupuesto = false; 
                 
                  

                }
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

  denunciar(){

         if ((this.foto164 == "" || this.foto264 == "" || this.foto364 == "") && this.comentario == ""  ) {
            
                 this.display=true;
                 this.messageService.add({ severity: 'error', detail: 'Seleccione la evidencia' });

         }  
         else{
               
                   this.display=false;
         }

  }
}
