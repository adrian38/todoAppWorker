import { Component, OnInit } from '@angular/core';
import { ObtSubSService } from 'src/app/services/obt-sub-s.service';

@Component({
  selector: 'app-factura-costos',
  templateUrl: './factura-costos.page.html',
  styleUrls: ['./factura-costos.page.scss'],
})
export class FacturaCostosPage implements OnInit {

  manoObra: number;
  materiales: number;
  total: number;

  constructor(private subServ: ObtSubSService) { }

  ngOnInit() {
    this.manoObra = 25.50;
    this.materiales = 89.54;
    this.total = this.manoObra + this.materiales;
    this.subServ.setruta('factura-servicios');
  }

  onClose() {
    console.log('Close clicked');
  }

}
