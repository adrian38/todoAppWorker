
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController,Platform ,IonContent} from '@ionic/angular';

import { ChatDetails } from 'src/app/Interfaces/interfaces';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-solicitudes-chat-detalles',
  templateUrl: './solicitudes-chat-detalles.page.html',
  styleUrls: ['./solicitudes-chat-detalles.page.scss'],
})

export class SolicitudesChatDetallesPage implements OnInit {

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

  task: TaskModel;

  @ViewChild(IonContent) content: IonContent;


  constructor(private _taskOdoo    : TaskOdooService,
             private navCtrl : NavController,
             private platform      : Platform) { }

  ngOnInit() {

    
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'back' }) ;
 });

    this.task=this._taskOdoo.getTaskCesar();


    this.presupuesto = this.task.budget;
    this.categoria = 'FONTANERIA';
    this.descripcion = this.task.title;
   
    this.materiales = 28;
    this.manoObra = 54;
    this.total = this.materiales + this.manoObra;

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

  onClose() {
    console.log("Close clicked");
  }

}
