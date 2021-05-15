import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from '@ionic/angular';

@Component({
  selector: 'app-recuperarcontrase',
  templateUrl: './recuperarcontrase.page.html',
  styleUrls: ['./recuperarcontrase.page.scss'],
})
export class RecuperarcontrasePage implements OnInit {

  actual:string='';

  constructor( private navController : NavController,
               private platform      : Platform) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navController.navigateRoot('/login-user', {animated: true, animationDirection: 'back' }) ;
 }); 
  }

  aceptar(caso1,caso2){

    if( caso1 == false && caso2 == true){
      this.navController.navigateRoot('/login-user', {animated: true, animationDirection: 'back' }) ;

    }
    else{
      console.log('ca1',caso1);
      console.log('ca2',caso2);
      console.log('algo es mal');
      

    }

  }

}
