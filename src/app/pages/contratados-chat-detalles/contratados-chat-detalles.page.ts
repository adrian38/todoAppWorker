import { ChatDetails } from 'src/app/Interfaces/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-contratados-chat-detalles',
  templateUrl: './contratados-chat-detalles.page.html',
  styleUrls: ['./contratados-chat-detalles.page.scss'],
})
export class ContratadosChatDetallesPage implements OnInit {

  presupuesto: number;
  descripcion: string;
  fecha: string;
  horario: string;
  direccion: string;
  precio: number;
  materiales: number;
  manoObra: number;
  fotos: string [];
  nombreTrabajador: string;

  total: number;

  display:boolean=false;


  chats: ChatDetails[] = [];
  newMessage: string;

  task: TaskModel;

  @ViewChild(IonContent) content: IonContent;


  constructor(private _taskOdoo :TaskOdooService,
              private navCtrl   :NavController) { }

  ngOnInit() {
    
    this.task=this._taskOdoo.getTaskCesar();
    console.log(" estoy ",this.task);


    this.presupuesto = 20;
   /*  this.descripcion = 'Arreglar un grifo de agua';
    this.fecha = 'Miércoles, 9 de Septiembre de 2020';
    this.horario = 'De 09:00am a 10:00am';
    this.direccion = 'Calle 52 #1701 e/ 19 y 17, Playa'; */
    this.precio = 20;
    /* this.nombreTrabajador = 'Lisniel Sanchez' */
  /*   this.materiales = 28;
    this.manoObra = 54;
    this.total = this.materiales + this.manoObra; */

    setTimeout(() => {
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

    }, 8000);
  }

  pushToChat() {

    if(this.newMessage.length === 0)
    {
      return;
    }
    
    const newChat: ChatDetails =
    {
      userID: "Me",
      timeStamp: Date.now(),
      isLastMessage: true,
      message: this.newMessage,
      date: ""
    };

    //Se limpian las banderas de ultimo mensaje
    for(let i = 0; i < this.chats.length; i++) {
      if(this.chats[i].userID === newChat.userID) {
        this.chats[i].isLastMessage = false;
      }
    }

    this.unshiftChat(newChat);

    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 500);

    this.newMessage = '';

    console.log(this.chats);
  }

  unshiftChat(chat: ChatDetails) {
    let currentTime = Date.now();
    let strTime = new Date(currentTime).toLocaleString();

    chat.date = strTime;

    this.chats.unshift(chat);
  }

  onClickUbicacion( event ) {
    console.log('Ubicacion clicked');
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
    console.log('Close clicked');
  }

  onClickEnviar() {
    console.log("Enviar clicked");
  }

}
