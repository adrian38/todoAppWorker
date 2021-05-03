import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-costo-extra',
  templateUrl: './costo-extra.page.html',
  styleUrls: ['./costo-extra.page.scss'],
})
export class CostoExtraPage implements OnInit {

/*   manoobra:string="";
  materiales:string=""; */
  manoobra   :number;
  materiales :number;
  total:number=0;

  constructor(private platform: Platform,
		          public navCtrl: NavController) { }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(10, () => {
    
          this.navCtrl.navigateRoot('/contratados-chat-detalles', {animated: true, animationDirection: 'back' }) ;
      
           
           }); 

    
  }
  obra(event){
    console.log("ob",this.materiales);
    if(this.materiales == 0 && this.manoobra == 0 || this.materiales == undefined  && this.manoobra == undefined){
      this.total=0;  
    }
    else{
      if(this.materiales == null){
        this.total=this.manoobra;
      }
        else{
          if(this.manoobra == null){
            this.total=this.materiales;
          }
          else{
            this.total=this.manoobra + this.materiales;  
        } 
      }
    }
  }

  material(event){
    
    if(this.materiales == 0 && this.manoobra == 0  || this.materiales == undefined  && this.manoobra == undefined){
      this.total=0;
      }
    else{
      if(this.manoobra == null){
        this.total=this.materiales;
        }
        else{
          if(this.materiales == null){
            this.total=this.manoobra;
          }
          else{
            this.total=this.manoobra + this.materiales;
           
          }
        }
       }
      }


}
