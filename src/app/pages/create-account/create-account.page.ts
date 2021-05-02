import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController , NavController,Platform} from '@ionic/angular';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  nombre = '';
  birthday = '';
  user = '';
  password = '';
  confirmPass = '';
  phone = '';
  streetNumber: number;
  number: number;
  floor: number;
  portal: number;
  staircase: number;
  door: number;
  postalCode: number;
  avatarUsuario = '../../assets/icons/registro.svg';

  selectFoto = false;
  coordenadas = false;
  esMayorEdad = true;

  greenBorder = '1px solid  #05b10580';
  noBorder = 'none';

  constructor(private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public navController:NavController,
    private platform: Platform) { }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navController.navigateRoot('/inicio', {animated: true, animationDirection: 'back' }) ;
 }); 
  }

  async presentAlert() {
    const actionSheet = await this.alertCtrl.create({
      header: '¿Desea colocar una foto?',
      message: 'Selecione la opcion de camara o galeria para la foto ',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            console.log('Camara clicked');
          }
        },
        {
          text: 'Galería',
          handler: () => {
            console.log('Galeria clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.selectFoto = false;
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create(
      {
        message,
        duration: 2000
      }
    );

    toast.present();
  }

  onPictureClick(event) {
    this.selectFoto = true;
    this.presentAlert();
  }

  onLocationClick() {
    //this.coordenadas = true;
   
    this.navController.navigateRoot('/mapa-registro', { animated: true, animationDirection: 'forward' }); 
    console.log('Location clicked');
  }

  validarMayorDeEdad(date: string) {

    // Ver si se puede mejorar este algoritmo

    const inputDate = new Date(date);
    const currentDate = new Date(Date.now());

    const bYears = inputDate.getFullYear();
    const timeYears = currentDate.getFullYear();

    const difYears = timeYears - bYears;

    // Cantidad de meses entre las 2 fechas
    const months = (difYears * 12) + (currentDate.getMonth() - inputDate.getMonth());

    // 18 años son 12 meses por 18 asi que son 216 meses
    // si la diferencia de meses entre las 2 fechas es mayor que 216 meses entonces
    // la persona es mayor de 18 años.
    // Este algoritmo no toma en cuenta los dias que quedan en el mismo mes, asi que si cumple 18
    // en el mismo mes en curso pero no los ha cumplido todavia, se toma en consideración.
    
    if (months >= 216) {
      console.log("Es mayor de edad");
      this.esMayorEdad = true;
    }
    else {
      console.log("No es mayor de edad");
      this.esMayorEdad = false;
    }
  }

}
