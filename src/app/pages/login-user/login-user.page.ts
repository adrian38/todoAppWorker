import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.page.html',
  styleUrls: ['./login-user.page.scss'],
})
export class LoginUserPage implements OnInit {

  usuario = {
    email: '',
    password: ''
  };

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
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

  onSubmit(event) {
    if (this.usuario.password.length < 5) {
      this.presentToast('La contraseña debe tener al menos 5 caracteres');
    }
    else {
      console.log("Inicio sesion clicked");
    }
  }

}
