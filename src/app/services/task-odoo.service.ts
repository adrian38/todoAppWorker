/* //********************************************************************************1 */

import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { Address, TaskModel } from '../models/task.model';
import { Observable, Subject } from 'rxjs';
import { AuthOdooService } from './auth-odoo.service';
import { PilaSolicitudes } from '../models/pilaSolicitudes.class';
import { Router } from '@angular/router';

let jayson = require('../../../node_modules/jayson/lib/client/');

let jaysonServer;

let knownTypes = {
	'/': 'data:image/jpg;base64,',
	i: 'data:image/png;base64,'
};

let user: UsuarioModel;

let task$ = new Subject<TaskModel[]>();

let tasksList$ = new Subject<boolean>();

let tasksList:TaskModel [];
let contratadosList: TaskModel [];

let solicitudesList: TaskModel[];
let historialList: TaskModel[];
let contratadosList: TaskModel[];

let temp;

let notificationPoCancelled$ = new Subject<number[]>(); ////Proveedor

//////**********************bprrar */******************************************************************************** */



//////////////////////////////////////////////////////////////////////////////

let notificationNewPoSuplier$ = new Subject<number[]>(); ///////Proveedor

let notificationNewOffertSuplier$ = new Subject<any[]>(); ///////cliente

////////////////////////////////////////////////////////////////////////////

let notificationNewMessg$ = new Subject<number[]>(); ///////Proveedor

let notificationSendOffertOk$ = new Subject<number>();

let notificationError$ = new Subject<boolean>();

let notificationOK$ = new Subject<boolean>();

let notificationPoAcepted$ = new Subject<any[]>();

let rutaActual: boolean = true;
let rutaChat: boolean = false;

//-------------------------------------------------cesar

let pilaSolicitudes: PilaSolicitudes<number>;

let taskPayment: TaskModel;

let taskCesar: TaskModel;

let init: boolean = false;

let initTab: boolean = false;

@Injectable({
	providedIn: 'root'
})
export class TaskOdooService {
	selectedTab: String;
	selectedTab$ = new Subject<String>();

	constructor(private _authOdoo: AuthOdooService, private router: Router,) {
		jaysonServer = this._authOdoo.OdooInfoJayson;
		pilaSolicitudes = new PilaSolicitudes<number>();
		
	}

	setTaskPayment(task: TaskModel) {
		taskPayment = task;
	}

	getTaskPayment() {
		return taskPayment;
	}

	setInit() {
		init = true;
	}

	getInit() {
		return init;
	}

	setInitTab(temp:boolean) {
		initTab = temp;
	}

	getInitTab() {
		return initTab;
	}

	setTaskCesar(task: TaskModel) {
		taskCesar = task;
	}
	getTaskCesar() {
		return taskCesar;
	}

	getPilaSolicitud() {
		return pilaSolicitudes.extraer();
	}

	getPilaEmpthy() {
		return pilaSolicitudes.empthy();
	}

	////---------------------------------------------------------------------------------------------------------Adrian

	setUser(usuario: UsuarioModel) {
		user = usuario;
	}

	

	setTab1In(temp:boolean){
		rutaActual = temp;
	}

	getNotificationError$(): Observable<boolean> {
		return notificationError$.asObservable();
	}

	/* getRequestedNotificationPoAcepted$(): Observable<any[]> {
		return notificationPoAcepted$.asObservable();
	} */

	getRequestedNotificationNewMessg$(): Observable<number[]> {
		return notificationNewMessg$.asObservable();
	}

	notificationPull() {
		let id_po = [];
		let id_po_offert = [];
		let id_messg = [];
		let new_offert = [];
		let id_offert_acepted = [];

		let poll = function(uid, partner_id, last) {
			let path = '/longpolling/poll';

			client = jayson.http({ host: jaysonServer.host, port: jaysonServer.port + path });

			client.request(
				'call',
				{ context: { uid: uid }, channels: [ jaysonServer.db + '_' + partner_id.toString() ], last: last },
				{ context: { lang: 'es_ES', uid: uid } },
				function(err, error, value) {
					if (err) {
						console.log(err, 'Error poll');
					} else {
						if (typeof value !== 'undefined' && value.length > 0) {
							id_po = [];
							id_po_offert = [];
							id_messg = [];
							new_offert = [];
							id_offert_acepted = [];

							console.log(value, 'esta fue la notificacion q llego');

							for (let task of value) {
								if (
									task['message']['type'] === 'purchase_order_notification' &&
									task['message']['action'] === 'created'
								) {
									console.log('se ha creado una nueva So');
									id_po.push(task['message']['order_id']);
								}

								if (
									(task['message']['type'] === 'purchase_order_notification' &&
										task['message']['action'] === 'canceled') ||
									task['message']['action'] === 'calceled'
								) {
									console.log('se ha eliminado una oferta');
									id_po_offert.push(task['message']['order_id']);
								}

								if (
									task['message']['type'] === 'purchase_order_notification' &&
									task['message']['action'] === 'confirmed'
								) {
									console.log('se ha contratado Servicio');
									id_offert_acepted.push({
										po_id: task['message']['order_id'],
										so_origin: task['message']['origin']
									});
								}

								if (
									task['message']['type'] === 'purchase_order_notification' &&
									task['message']['action'] === 'accepted'
								) {
									console.log('se ha creado una nueva oferta');
									new_offert.push({
										order_id: task['message']['order_id'],
										origin: task['message']['origin']
									});
								}

								if (
									task['message']['type'] === 'message_notification' &&
									task['message']['action'] === 'new'
								) {
									console.log('nuevo mensaje So');
									id_messg.push(task['message']['message_id']);
								}
							}

							if (typeof id_messg !== 'undefined' && id_messg.length > 0) {
								/* console.log(id_messg, 'nuevo mensaje id'); */

								if (rutaActual) {
									notificationNewMessg$.next(id_messg);
								}  else if(!rutaActual && !rutaChat) {

									for (let i = 0; i < id_messg.length; i++) {
										pilaSolicitudes.insertar(id_messg[i]);
										
									}
								
								} 
							}

							if (typeof id_po !== 'undefined' && id_po.length > 0) {
								console.log(id_po, 'lo q se esta mandando nueva solicitud');
								notificationNewPoSuplier$.next(id_po);
							}

							if (typeof id_offert_acepted !== 'undefined' && id_offert_acepted.length > 0) {
								// console.log(id_offert_acepted,"lo q se esta mandando oferta aceptada")
								notificationPoAcepted$.next(id_offert_acepted);
							}

							if (typeof id_po_offert !== 'undefined' && id_po_offert.length > 0) {
								//console.log(id_po_offert,"lo q se esta mandando oferta eliminada")
								notificationOffertCancelled$.next(id_po_offert);
							}

							if (typeof new_offert !== 'undefined' && new_offert.length > 0) {
								if (rutaActual) {
									notificationNewOffertSuplier$.next(new_offert);
								} else {
									for (let i = 0; i < new_offert.length; i++) {
										temp = solicitudesList.findIndex(
											(element) => element.id_string === new_offert[i]['origin']
										);
										if (temp != -1) {
											solicitudesList[temp].notificationOffert = true;
										}
									}
								}
							}

							poll(user.id, user.partner_id, value[value.length - 1].id);
						} else {
							poll(user.id, user.partner_id, 0);
						}
					}
				}
			);
		};

		let client = jayson.http({ host: jaysonServer.host, port: jaysonServer.port + jaysonServer.pathConnection });
		client.request(
			'call',
			{
				service: 'common',
				method: 'login',
				args: [ jaysonServer.db, jaysonServer.username, jaysonServer.password ]
			},
			function(err, error, value) {
				if (err || !value) {
					console.log(err, 'Error cancelPOsuplier');
				} else {
					poll(user.id, user.partner_id, 0);
				}
			}
		);
	}

	
	getRequestedNotificationNewPoSuplier$(): Observable<number[]> {
		return notificationNewPoSuplier$.asObservable();
	}

	cancelPOsuplier(id: number) {
		let cancelPOsuplierSelected = function() {
			let inParams = [];
			inParams.push([ id ]);
			let params = [];
			params.push(inParams);

			let fparams = [];
			fparams.push(jaysonServer.db);
			fparams.push(user.id);
			fparams.push(jaysonServer.password);
			fparams.push('purchase.order'); //model
			fparams.push('button_cancel'); //method

			for (let i = 0; i < params.length; i++) {
				fparams.push(params[i]);
			}

			client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function(
				err,
				error,
				value
			) {
				if (err) {
					console.log(err, 'Error cancelPOsuplierSelected');
				} else {
					
					notificationPoCancelled$.next([ id ]);
				}
			});
		};

		let client = jayson.http({ host: jaysonServer.host, port: jaysonServer.port + jaysonServer.pathConnection });
		client.request(
			'call',
			{
				service: 'common',
				method: 'login',
				args: [ jaysonServer.db, jaysonServer.username, jaysonServer.password ]
			},
			function(err, error, value) {
				if (err || !value) {
					console.log(err, 'Error cancelPOsuplier');
				} else {
					cancelPOsuplierSelected();
				}
			}
		);
	}

	getRequestedNotificationPoCancelled$(): Observable<number[]> {
		return notificationPoCancelled$.asObservable();
	}

	requestTask(id: number) {
		let tasksList: TaskModel[] = [];
		let id_po = [];

		let search_avatar_provider = function() {
			let inParams = [];
			inParams.push([ [ 'partner_id', '=', tasksList[0].provider_id ] ]);
			inParams.push([ 'image_1920' ]);
			let params = [];
			params.push(inParams);

			let fparams = [];
			fparams.push(jaysonServer.db);
			fparams.push(12);
			fparams.push(jaysonServer.password);
			fparams.push('res.users'); //model
			fparams.push('search_read'); //method

			for (let i = 0; i < params.length; i++) {
				fparams.push(params[i]);
			}

			client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function(
				err,
				error,
				value
			) {
				if (err) {
					console.log(err, 'Error search_avatar_provider');
				} else {
					if (value) {
						console.log(value, 'photo');
						if (knownTypes[value[0].image_1920[0]]) {
							tasksList[0].photoProvider = knownTypes[value[0].image_1920[0]] + value[0].image_1920;
						}
					}
					task$.next(tasksList);
				}
			});
		};

		let get_po_by_id = function() {
			id_po.push(id);
			let inParams = [];
			inParams.push([ [ 'id', 'in', id_po ] ]);
			inParams.push([
				'partner_id',
				'amount_total',
				'user_id',
				'origin',
				'title',
				'note',
				'commitment_date',
				'product_id',
				'address_street'
			]);
			let params = [];
			params.push(inParams);
			let fparams = [];
			fparams.push(jaysonServer.db);
			fparams.push(user.id);
			fparams.push(jaysonServer.password);
			fparams.push('purchase.order'); //model
			fparams.push('search_read'); //method

			for (let i = 0; i < params.length; i++) {
				fparams.push(params[i]);
			}

			client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function(
				err,
				error,
				value
			) {
				if (err || !value) {
					console.log(err, 'Error get_po_by_id');
				} else {
					for (let task of value) {
						let temp = new TaskModel();
						//temp.offer_send = task['state'];
						temp.budget = task['amount_total'];
						temp.type = task['product_id'][1];
						temp.description = task['note'];
						temp.client_id = task['user_id'][0];
						temp.client_name = task['user_id'][1];
						temp.provider_id = task['partner_id'][0];
						temp.provider_name = task['partner_id'][1];
						temp.id = id;
						//temp.state = task['invoice_status'];
						//temp.id_string = task['name'];
						//temp.date = task['date_order'];
						temp.date_planned = String(task['commitment_date']).slice(0, 10);
						temp.time = String(task['commitment_date']);
						temp.title = task['title'];
						temp.address = new Address(
							task['address_street'],
							task['address_number'],
							task['address_portal'],
							task['address_stairs'],
							task['address_floor'],
							task['address_door'],
							task['address_zip_code'],
							task['address_latitude'],
							task['address_longitude']
						);

						tasksList.push(temp);
					}
					search_avatar_provider();
					//task$.next(tasksList);
				}
			});
		};

		let client = jayson.http({ host: jaysonServer.host, port: jaysonServer.port + jaysonServer.pathConnection });
		client.request(
			'call',
			{
				service: 'common',
				method: 'login',
				args: [ jaysonServer.db, jaysonServer.username, jaysonServer.password ]
			},
			function(err, error, value) {
				if (err || !value) {
					console.log(err, 'Error requestTask');
				} else {
					console.log(value);
					get_po_by_id();
				}
			}
		);
	}

	getRequestedTask$(): Observable<TaskModel[]> {
		return task$.asObservable();
	}

	requestTaskListProvider() {
		let SO_origin = [];
		let SO_id = [];
		tasksList = [];

		let filter = function() {
			let temp: TaskModel[];
			temp = tasksList.filter((task) => {
				return task.state === 'to invoice'; //Solicitadas
			});
			if (typeof solicitudesList !== 'undefined' && solicitudesList.length > 0) {
				Array.prototype.push.apply(solicitudesList, temp);
			} else {
				solicitudesList = temp;
			}

			temp = tasksList.filter((task) => {
				return task.state === 'invoiced'; //Contratadas
			});
			if (typeof contratadosList !== 'undefined' && contratadosList.length > 0) {
				Array.prototype.push.apply(contratadosList, temp);
			} else {
				contratadosList = temp;
				historialList = temp;
			}

			temp = tasksList.filter((task) => {
				return task.state === ''; //Historial
			});
			if (typeof historialList !== 'undefined' && historialList.length > 0) {
				Array.prototype.push.apply(historialList, temp);
			} else {
				historialList = temp;
			}

			tasksList$.next(true);
		};

		let get_photo_so = function() {
			let inParams = [];
			inParams.push([ [ 'res_id', 'in', SO_id ] ]);
			inParams.push([ 'name', 'res_id', 'res_model', 'url', 'datas', 'mimetype', 'file_size' ]);

			let params = [];
			params.push(inParams);

			let fparams = [];
			fparams.push(jaysonServer.db);
			fparams.push(user.id);
			fparams.push(jaysonServer.password);
			fparams.push('ir.attachment'); //model
			fparams.push('search_read'); //method

			for (let i = 0; i < params.length; i++) {
				fparams.push(params[i]);
			}
			client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function(
				err,
				error,
				value
			) {
				if (err) {
					console.log(err, 'Error get_photo_so');
				} else {
					console.log(value);
					if (value) {
						for (let resId of value) {
							for (let task of tasksList) {
								if (task.origin_id === resId.res_id) {
									if (knownTypes[resId.datas[0]]) {
										task.photoNewTaskArray.push(knownTypes[resId.datas[0]] + resId.datas);
									}
								}
							}
						}
					}
					filter();
				}
			});
		};

		let get_Res_Id = function() {
			let inParams = [];
			inParams.push([ [ 'name', 'in', SO_origin ] ]);
			inParams.push([ 'id', 'name' ]);

			let params = [];
			params.push(inParams);

			let fparams = [];
			fparams.push(jaysonServer.db);
			fparams.push(user.id);
			fparams.push(jaysonServer.password);
			fparams.push('sale.order'); //model
			fparams.push('search_read'); //method

			for (let i = 0; i < params.length; i++) {
				fparams.push(params[i]);
			}

			client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function(
				err,
				error,
				value
			) {
				if (err || !value) {
					console.log(err, 'Error get_Res_Id');
				} else {
					SO_id = [];
					for (let id_value of value) {
						SO_id.push(id_value.id);
					}
					for (let task of tasksList) {
						let temp = value.find((element) => element.name === task.origin);
						if (temp) {
							task.origin_id = temp.id;
						}
					}

					get_photo_so();
				}
			});
		};

		let get_po_list = function(partnerId) {
			let inParams = [];
			inParams.push([ [ 'partner_id', '=', partnerId ] ]);
			inParams.push([
				'state',
				'product_id',
				'note',
				'user_id',
				'partner_id',
				'name',
				'date_order',
				'commitment_date',
				'invoice_status',
				'title',
				'note',
				'require_materials',
				'commitment_date',
				'address_street',
				'address_floor',
				'address_portal',
				'address_number',
				'address_door',
				'address_stairs',
				'address_zip_code',
				'address_latitude',
				'address_longitude',
				'origin',
				'state'
			]);
			let params = [];
			params.push(inParams);

			let fparams = [];
			fparams.push(jaysonServer.db);
			fparams.push(user.id);
			fparams.push(jaysonServer.password);
			fparams.push('purchase.order'); //model
			fparams.push('search_read'); //method

			for (let i = 0; i < params.length; i++) {
				fparams.push(params[i]);
			}

			client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function(
				err,
				error,
				value
			) {
				if (err || !value) {
					console.log(err, 'get_po_list');
				} else {
					tasksList = [];
					SO_origin = [];
					for (let task of value) {
						let temp = new TaskModel();
						temp.offer_send = task['state'];
						temp.origin = task['origin'];
						SO_origin.push(task['origin']);
						temp.type = task['product_id'][1];
						temp.description = task['note'];
						temp.client_id = task['user_id'][0];
						temp.client_name = task['user_id'][1];
						temp.provider_id = task['partner_id'][0];
						temp.provider_name = task['partner_id'][1];
						temp.require_materials = task['require_materials'];
						temp.id = task['id'];
						temp.state = task['invoice_status'];
						temp.id_string = task['name'];
						temp.date = task['date_order'];
						temp.date_planned = String(task['commitment_date']).slice(0, 10);
						temp.time = String(task['commitment_date']);
						temp.title = task['title'];
						temp.address = new Address(
							task['address_street'],
							task['address_number'],
							task['address_portal'],
							task['address_stairs'],
							task['address_floor'],
							task['address_door'],
							task['address_zip_code'],
							task['address_latitude'],
							task['address_longitude']
						);

						tasksList.push(temp);
					}

					if (SO_origin.length) {
						get_Res_Id();
					} else {
						filter();
					}
				}
			});
		};

		let client = jayson.http({ host: jaysonServer.host, port: jaysonServer.port + jaysonServer.pathConnection });
		client.request(
			'call',
			{
				service: 'common',
				method: 'login',
				args: [ jaysonServer.db, jaysonServer.username, jaysonServer.password ]
			},
			function(err, error, value) {
				if (err || !value) {
					console.log(err, 'requestTaskListProvider');
				} else {
					get_po_list(user.partner_id);
				}
			}
		);
	}




	getRequestedTaskList$(): Observable<boolean> {
		return tasksList$.asObservable();
	}



	//----------------------------------Temporal y se puede borrar cuando se determine-----------
 setContratados(c)
 {
 contratadosList=c;
		}

getContratados(){
	return contratadosList;
}
//---------------------------------fin-------------------------------------------------------
	
getUser() {
	return user;
}
}
