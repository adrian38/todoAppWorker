import { Component, OnInit } from '@angular/core';
import { TaskModel } from 'src/app/models/task.model';
import { TaskOdooService } from 'src/app/services/task-odoo.service';

@Component({
  selector: 'app-historial-detalles',
  templateUrl: './historial-detalles.page.html',
  styleUrls: ['./historial-detalles.page.scss'],
})
export class HistorialDetallesPage implements OnInit {

  task: TaskModel;

  constructor(private _taskOdoo :TaskOdooService) { }

  ngOnInit() {

    this.task=this._taskOdoo.getTaskCesar();
    console.log(" estoy ",this.task);
  }

}
