import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthOdooService } from 'src/app/services/auth-odoo.service';

@Component({
  selector: 'app-contrase',
  templateUrl: './contrase.page.html',
  styleUrls: ['./contrase.page.scss'],
})
export class ContrasePage implements OnInit {

  actual    :string="";
  cambiada  :string="";
  confirmada:string="";

  error_actual:boolean=true;
  error_confirmacion:boolean=true;

  usuario:UsuarioModel;

  constructor(private _authOdoo:AuthOdooService) { }

  ngOnInit() {

    this.usuario= this._authOdoo.getUser();
    console.log("usuario",this.usuario);
    console.log(" contraseña del usuario ",this.usuario.password);
   
  }


  guardar(){

    if( this.usuario.password == this.actual ) {

            console.log("contraseña actual bien");
            this.error_actual=true;
    }
            else{
               this.error_actual=false;
              console.log("contraseña actual mal");
    }

    if(this.cambiada == this.confirmada){
             
             this.error_confirmacion=true;
            
            }
            else{
              this.error_confirmacion=false;
            }



  }

}
