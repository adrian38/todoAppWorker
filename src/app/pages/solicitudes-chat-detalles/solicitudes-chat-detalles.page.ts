import { flatten } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ChatDetails } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-solicitudes-chat-detalles',
  templateUrl: './solicitudes-chat-detalles.page.html',
  styleUrls: ['./solicitudes-chat-detalles.page.scss'],
})

export class SolicitudesChatDetallesPage implements OnInit {

  presupuesto: number;

  chats: ChatDetails[] = [];
  newMessage: string;

  @ViewChild(IonContent) content: IonContent;


  constructor() { }

  ngOnInit() {
    this.presupuesto = 20;

    setTimeout(() => {
      let simulatedChat: ChatDetails [] = [
        {
          userID: "Juan Perez",
          timeStamp: Date.now(),
          isLastMessage: false,
          message: 'Hola, como estas?? Quisiera ver si se puede pasar la oferta para el Viernes por la mañana.'
        },
        {
          userID: "Juan Perez",
          timeStamp: Date.now(),
          isLastMessage: false,
          message: 'Si pudieras venir el viernes a las 10am seria lo mejor, a esa hora no tengo compromisos'
        },
        {
          userID: "Juan Perez",
          timeStamp: Date.now(),
          isLastMessage: true,
          message: 'Ok, saludos'
        }
      ]

      this.chats.push(...simulatedChat);
    }, 8000);
  }

  segmentChanged(event) {

  }

  pushToChat() {

    const newChat: ChatDetails =
    {
      userID: "Me",
      timeStamp: Date.now(),
      isLastMessage: true,
      message: this.newMessage
    };

    //Se limpian las banderas de ultimo mensaje
    for(let i = 0; i < this.chats.length; i++) {
      if(this.chats[i].userID === newChat.userID) {
        this.chats[i].isLastMessage = false;
      }
    }

    this.chats.push(newChat);

    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 500);

    this.newMessage = '';

    console.log(this.chats);
  }

}
