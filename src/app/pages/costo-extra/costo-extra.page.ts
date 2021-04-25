import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costo-extra',
  templateUrl: './costo-extra.page.html',
  styleUrls: ['./costo-extra.page.scss'],
})
export class CostoExtraPage implements OnInit {

  manoobra:string="";
  materiales:string="";
  total:number=0;

  constructor() { }

  ngOnInit() {

    
  }

  obra(event){
    console.log("ob",this.materiales);
    if(this.materiales == "" && this.manoobra == ""){
      this.total=0;
      
    }
    else{
      if(this.materiales == ""){
        this.total=parseInt(this.manoobra);
        console.log("materiales vacio");
        console.log("materiales vacio",this.total);
        }
        else{
          if(this.manoobra == ""){
            this.total=parseInt(this.materiales);
          }
          else{
            this.total=parseInt(this.manoobra) + parseInt(this.materiales);
            console.log("campos llenos");
            console.log("lleno estoy en obras",this.total);
          }
         
        }
    }

    
  
 


  }

  material(event){
    console.log("a",this.manoobra);
    if(this.materiales == "" && this.manoobra == ""){
      this.total=0;
      
    }
    else{
      if(this.manoobra == ""){
        this.total=parseInt(this.materiales);
        console.log("materiales vacio");
        console.log("materiales vacio",this.total);
        }
        else{
          if(this.materiales == ""){
            this.total=parseInt(this.manoobra);
          }
          else{
            this.total=parseInt(this.manoobra) + parseInt(this.materiales);
            console.log("campos llenos");
            console.log("lleno estoy en obras",this.total);
          }
        }
    }
  }


}
