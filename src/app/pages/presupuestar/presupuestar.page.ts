import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-presupuestar',
  templateUrl: './presupuestar.page.html',
  styleUrls: ['./presupuestar.page.scss'],
})
export class PresupuestarPage implements OnInit {

  manoobra:number;
  materiales:number;
  total:number=0;

  verpresupuestar: boolean = true;
	verdetalles: boolean = false;
	valorSegment: string = '';


  task: TaskModel;

  constructor(private _taskOdoo: TaskOdooService) { }

  ngOnInit() {
 
    this.task=this._taskOdoo.getTaskCesar();
    console.log(" estoy Presupuestado",this.task);

   
  }

  segmentChanged(event){

		
		this.valorSegment = event.detail.value;
    console.log(this.valorSegment)

		if (this.valorSegment === 'presupuestar') {
			this.verpresupuestar = true;
			this.verdetalles = false;

		
		}

		if (this.valorSegment === 'detalles') {
			this.verpresupuestar = false;
			this.verdetalles = true;
		
		}
	}

  obra(event){
    this.total=this.manoobra + this.materiales;

  }

  material(event){
    this.total=this.manoobra + this.materiales;
  }

}
