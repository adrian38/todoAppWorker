import { ChatDetails } from 'src/app/Interfaces/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

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


  chats: ChatDetails[] = [];
  newMessage: string;

  @ViewChild(IonContent) content: IonContent;


  constructor() { }

  ngOnInit() {
    this.presupuesto = 20;
    this.descripcion = 'Arreglar un grifo de agua';
    this.fecha = 'Miércoles, 9 de Septiembre de 2020';
    this.horario = 'De 09:00am a 10:00am';
    this.direccion = 'Calle 52 #1701 e/ 19 y 17, Playa';
    this.precio = 20;
    this.nombreTrabajador = 'Lisniel Sanchez'
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

  onClickUbicacion( event ) {
    console.log('Ubicacion clicked');
  }

  onClickCostoEntrada( event ) {
    console.log('Costo de entrada clicked');
  }

  onClickFactura( event ) {
    console.log('Factura clicked');
  }

  onClickDenunciar( event ) {
    console.log('Denunciar clicked');
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
