import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pago-promociones',
  templateUrl: './pago-promociones.page.html',
  styleUrls: ['./pago-promociones.page.scss'],
  providers: [MessageService]
})
export class PagoPromocionesPage implements OnInit {
	
  numero_tarjeta: string = '';
  month:string="";
  year:string="";
  cvc:string="";
  cvcn:number;
  resta_years:number=0;
  btn_habilitado:boolean=false;
  mes_actual:number=0;
  years_actual:number=0;
  numero_tarjetan:number;

  year_correcto:boolean;
  mes_correcto:boolean;
  cvc_correcto:boolean;
  error:boolean=false;

  loading: any;

  constructor( private navCtrl  : NavController,
               private platform : Platform,
			   private messageService: MessageService,
			   public loadingController: LoadingController) { }

  ngOnInit() {

	// console.log('tarjeta',this.numero);
	// console.log('tarjeta tama',this.numero.length);
	// console.log('tarjeta l0',this.numero.charAt(0));

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot('/crear-promocion', {animated: true, animationDirection: 'back' }) ;
 });
  }

  btn_cancelar(){
    this.navCtrl.navigateRoot('/crear-promocion', {animated: true, animationDirection: 'forward' }) ;
  }
  
  btn_pagar(){
    this.validar_years();
    this.validar_mes();
    this.validar_cvc();
    this.pagar();
	

	if( this.error == false && this.year_correcto == false && this.mes_correcto == false && this.cvc_correcto == false ){
		console.log('pagar')
		this.btn_habilitado=true;
		this.presentLoading();
		setTimeout(() => {
     
			this.messageService.add({ severity: 'success', detail: 'Pago realizado correctamente'});
				 
			   }, 3000);
	}
	else{
		console.log('no se puede pagar hay error')
		this.btn_habilitado=false;
	
		this.messageService.add({ severity: 'error', detail: 'Operación de pago incorrecta ' });
	}
	
    //this.navCtrl.navigateRoot('/tabs/tab1', {animated: true, animationDirection: 'forward' }) ;

  }

  validar_years(){
    let currentYear = new Date();
    this.years_actual=currentYear.getFullYear();
    this.mes_actual=currentYear.getMonth();
    this.resta_years=(this.years_actual) - parseInt(this.year);

    if(this.resta_years < 0 || this.year == ""){
    
      this.year_correcto = true;
      console.log('restaif',this.year);
    }
    else{
      console.log('resta',this.resta_years);
      this.year_correcto = false;
    }
 
  }

  validar_mes(){
    let currentYear = new Date();
    this.mes_actual=currentYear.getMonth();
if(parseInt(this.month) <13){
  if(this.resta_years == 0){
    if( this.mes_actual >=  parseInt(this.month)){
      //se cumple todo bien
      this.mes_correcto=false;
    }
    else{
     this.mes_correcto=true;
    }
   }
   else{
     this.mes_correcto=false;
   }
}
else{
  this.mes_correcto=true;
}

  }

  validar_cvc()
{
	 
	  if(this.cvcn === undefined){
		this.cvc_correcto =true; 
	  }
	  else {
		this.cvc=this.cvcn.toString();

		if(this.cvc == "" || this.cvc.length < 3){
		  this.cvc_correcto =true;
		  console.log('true')
		}
		else{
			this.cvc_correcto =false;
			console.log('false');
		}
	  }
	 

 }



//   id, oring_id
pagar() {
	
	 console.log('c',this.numero_tarjetan);
	 console.log('cssss');

	if(this.numero_tarjetan === undefined){
		this.error =true; 
	  }
	  else{

		this.numero_tarjeta = this.numero_tarjetan.toString();



		if ((this.numero_tarjeta != "" && this.numero_tarjeta.length > 12)) {
			if (this.numero_tarjeta.charAt(0) == '4') {
	
			
	
				this.error = this.tarjeta();
				//this.dato();
	
				if (!this.error) {
					console.log('tarjeta correcta');
					// this.temporal('espere');
					// this._taskOdoo.acceptProvider(id, oring_id, card);
					// this.tempPaid = oring_id;
	
	
				} else {
					console.log("tarjeta incorrecta");
				}
	
				/* this._taskOdoo.acceptProvider(993, 0); */
	
				//this._taskOdoo.acceptProvider(id, oring_id);
	
				// setTimeout(() => {
				// 	this.loading1.dismiss();
				// 	this.presentAlertConfirm();
				// }, 2000);
			}
	
			else if (
				this.numero_tarjeta.charAt(0) == '5' &&
				(this.numero_tarjeta.charAt(1) == '1' ||
					this.numero_tarjeta.charAt(1) == '2' ||
					this.numero_tarjeta.charAt(1) == '3' ||
					this.numero_tarjeta.charAt(1) == '4' ||
					this.numero_tarjeta.charAt(1) == '5')
			) {
				//this.tarjeta();
				// let card = {
				// 	'number': this.numero_tarjeta,
				// 	'cvc': this.cvc,
				// 	'exp_month': this.mes,
				// 	'exp_year': this.anno
				// }
	
				this.error = this.tarjeta();
				//this.dato();
	
				if (!this.error) {
					console.log('tarjeta correcta');
					// this.tempPaid = oring_id;
					// this._taskOdoo.acceptProvider(id, oring_id, card);
	
	
				} else {
					console.log("tarjeta incorrecta");
					
				}
	
			}
	
		}
		else {
			console.log("rellene el campo");
			this.error=true;
		}
	
	  }

}
  tarjeta() {
		let numPimpares = [];
		let numPpares = [];
		let suma_impar = 0;
		let suma_par = 0;
		let error = false;

		for (let i = 0; i < this.numero_tarjeta.length; i += 2) {
			numPimpares[i] = parseInt(this.numero_tarjeta.charAt(i)) * 2;

			numPimpares[i] = this.numero_simple(numPimpares[i]);

			suma_impar += numPimpares[i];
		}
		for (let p = 1; p < this.numero_tarjeta.length; p += 2) {
			numPpares[p] = parseInt(this.numero_tarjeta.charAt(p));

			suma_par += numPpares[p];
		}

		var dif = (suma_par + suma_impar) % 10;
		console.log(dif);

		if (dif != 0) {
			error = true;
		}





		return error;
	}



  
	numero_simple(digit) {
		if (digit > 9) {
			var tmp = digit.toString();
			var d1 = parseInt(tmp.charAt(0));
			var d2 = parseInt(tmp.charAt(1));
			return d1 + d2;
		} else {
			return digit;
		}
	}



	async presentLoading() {
		this.loading = await this.loadingController.create({
		  cssClass: 'my-custom-class',
		  message: 'Realizando pago...',
		  duration: 2000
		});
	
		return this.loading.present();
	  }
}
