import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-iae',
  templateUrl: './popover-iae.component.html',
  styleUrls: ['./popover-iae.component.scss'],
})
export class PopoverIaeComponent implements OnInit {

  // 0 - Ningun elemento seleccionado
  // 1 - Elemento camara seleccionado
  // 2 - Elemento galeria seleccionado
  // 3 - Elemento documento seleccionado
  elementoClicked: number = 0;

  constructor( private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  onCameraClick() {
    console.log("Camera clicked");
    this.elementoClicked = 1;
    console.log('Camera clicked con foto')
    
    this.popoverCtrl.dismiss({
      item: this.elementoClicked
    });
  }

  onGaleryClick() {
    console.log("Galery clicked");
    this.elementoClicked = 2;
    this.popoverCtrl.dismiss({
      item: this.elementoClicked
    });
  }

  onDocumentClick() {
    console.log("Document clicked");
    this.elementoClicked = 3;
    this.popoverCtrl.dismiss({
      item: this.elementoClicked
    });
  }

}
