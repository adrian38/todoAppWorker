import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { Observable, Subject } from 'rxjs';
const jayson = require('../../../node_modules/jayson/lib/client/');

//let host = '192.168.0.107';
// let host = '192.168.1.2';
const host = 'odoo.todoenunapp.com';
//const port = 8069;
const port = 443;
const db = 'demo';
const user = 'root';
const pass = 'root';
const pathConnection = '/jsonrpc';

const notificationError$ = new Subject<boolean>();

const notificationOK$ = new Subject<boolean>();

const notificationLink$ = new Subject<string>();

let newUser: UsuarioModel = new UsuarioModel;

/* newUser.username = 'beatrizplomera5@example.com';
newUser.password = 'epicentro'; 
newUser.id = 97;
newUser.partner_id = 175; */


@Injectable({
  providedIn: 'root',
})
export class SignUpOdooService {
  constructor() { }

  getNotificationError$(): Observable<boolean> {
    return notificationError$.asObservable();
  }

  getNotificationOK$(): Observable<boolean> {
    return notificationOK$.asObservable();
  }

  getNotificationLink$(): Observable<string> {
    return notificationLink$.asObservable();
  }


  setUser(user: UsuarioModel) {

    newUser = user;

  }


  newUser(usuario: UsuarioModel) {
    console.log(usuario, 'sigupClient');


    newUser.username = usuario.username;
    newUser.password = usuario.password;

    let user_to_create;
    let id_job;

    if (usuario.type === "Fontanero") {
      id_job = 29
    }

    user_to_create = {
      name: usuario.realname,
      classification: 'vendor', // puede ser 'custumer','vendor' o 'admin'
      login: usuario.username,
      email: usuario.username,
      password: usuario.password,
      image_1920: usuario.avatar,
      groups_id: [22, 1, 11, 17, 34, 23, 6, 35, 20, 19],
      /* groups_id son los mismos para custumer y vendor para admin son: [2,21,36,22,26,7,1,11,17,34,3,23,6,35,20,19]*/
    };


    let updateUser = function (new_usuario: UsuarioModel) {

      let partner_update = {

        date: usuario.date, //birthdate
        address_street: usuario.address.street,
        address_floor: usuario.address.floor,
        address_portal: usuario.address.portal,
        address_number: usuario.address.number,
        address_door: usuario.address.door,
        address_stairs: usuario.address.stair,
        address_zip_code: usuario.address.cp,
        address_latitude: usuario.address.latitude,
        address_longitude: usuario.address.longitude,
        phone: usuario.phone,
        vat: usuario.vat, //NIF
        is_company: usuario.is_company, //individual person or company
        //'vat_cif':'', //CIF number
        social_security: usuario.social_security, //Social security number
        //'iae_code' :'', //I.A.E code
        dni: usuario.dni, //DNI number
        bank_ids: [[0, 0, { acc_number: usuario.bank_ids }]], //bank account with iban format
        product_supply_ids: [//subscripciones para ser supplier 

          [0, 0,

            {
              name: new_usuario,
              product_tmpl_id: id_job,//template_id optenido del servicio del que va a ser supplier
            }
          ]
        ]
      }


      /*  let path = '/jsonrpc';
       let client = jayson.https('https://' + host + ':' + port + path); */

      let inParams = [];
      inParams.push(new_usuario.partner_id);
      inParams.push(partner_update);
      let params = []
      params.push(inParams)

      let fparams = [];
      fparams.push(db);
      fparams.push(1);
      fparams.push(pass);
      fparams.push('res.partner'); //model
      fparams.push('write'); //method

      for (let i = 0; i < params.length; i++) {
        fparams.push(params[i]);
      }

      client.request(
        'call',
        { service: 'object', method: 'execute_kw', args: fparams },
        function (err, error, value) {
          if (err) {
            console.log(err, 'Error update partner');
            notificationError$.next(true);

          } else {
            console.log('Exito update partner');
            notificationOK$.next(true);
          }
        }
      );




    }



    let get_user = function (id: number) {


      let inParams = [];
      inParams.push([['id', '=', id]]);
      inParams.push(['partner_id']);
      let params = [];
      params.push(inParams);

      let fparams = [];
      fparams.push(db);
      fparams.push(id);
      fparams.push(usuario.password);
      fparams.push('res.users'); //model
      fparams.push('search_read'); //method

      for (let i = 0; i < params.length; i++) {
        fparams.push(params[i]);
      }

      client.request(
        'call',
        { service: 'object', method: 'execute_kw', args: fparams },
        function (err, error, value) {
          if (err || !value) {
            console.log(err, 'Error get_user');
            notificationError$.next(true);
          } else {
            usuario.partner_id = value[0].partner_id[0];
            newUser.partner_id = value[0].partner_id[0];
            updateUser(usuario);
          }
        }
      );
    };



    let path = '/jsonrpc';
    let client = jayson.https('https://' + host + ':' + port + path);

    let inParams = [];
    inParams.push(user_to_create);
    let params = [];
    params.push(inParams);

    let fparams = [];
    fparams.push(db);
    fparams.push(1);
    fparams.push(pass);
    fparams.push('res.users'); //model
    fparams.push('create'); //method

    for (let i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }

    client.request(
      'call',
      { service: 'object', method: 'execute_kw', args: fparams },
      function (err, error, value) {
        if (err || !value) {
          console.log(err, 'Error creando usuario o el usuario ya existe');
          notificationError$.next(true);
        } else {
          console.log(value, 'Exito creando el usuario');
          newUser.id = value;
          get_user(value);
        }
      }
    );
  }


  updateUser(usuario: UsuarioModel) {
    // let id_job;

    /* if (usuario.type === "fontanero"){
       id_job = 29
  } */

    let user_to_update = {
      //'name':'michel morales ',
      //'classification':'vendor',// puede ser 'custumer','vendor' o 'admin'
      //'login':'michel@example.com',
      //'email':'michel@example.com',
      password: usuario.password,
      //'groups_id':[22,1,11,17,34,23,6,35,20,19],
      /* groups_id son los mismos para custumer y vendor para admin son: [2,21,36,22,26,7,1,11,17,34,3,23,6,35,20,19]*/
      image_1920: usuario.avatar,
    }

    let partner_update = {
      //date: usuario.date, //birthdate
      address_street: usuario.address.street,
      address_floor: usuario.address.floor,
      address_portal: usuario.address.portal,
      address_number: usuario.address.number,
      address_door: usuario.address.door,
      address_stairs: usuario.address.stair,
      address_zip_code: usuario.address.cp,
      address_latitude: usuario.address.latitude,
      address_longitude: usuario.address.longitude,
      phone: usuario.phone,
      //vat: usuario.vat, 
      //is_company: usuario.is_company, //individual person or company
      //social_security: usuario.social_security, //Social security number
      //dni: usuario.dni, //DNI number
      //bank_ids: [[0, 0, { acc_number: usuario.bank_ids }]], //bank account with iban format
      /* product_supply_ids:[//subscripciones para ser supplier 
     
           [0,0,
          
              {
                  name:usuario.partner_id,
                  product_tmpl_id:id_job,//template_id optenido del servicio del que va a ser supplier
              }
          ]
        ] */
    }

    console.log(partner_update, "info a actualizar");

    let updatePatner = function () {

      /* let path = '/jsonrpc';
      let client = jayson.https('https://' + host + ':' + port + path); */

      let inParams = [];
      inParams.push(usuario.partner_id);
      inParams.push(partner_update);
      let params = []
      params.push(inParams)

      let fparams = [];
      fparams.push(db);
      fparams.push(1);
      fparams.push(pass);
      fparams.push('res.partner'); //model
      fparams.push('write'); //method

      for (let i = 0; i < params.length; i++) {
        fparams.push(params[i]);
      }

      client.request(
        'call',
        { service: 'object', method: 'execute_kw', args: fparams },
        function (err, error, value) {
          if (err) {
            console.log(err, 'Error update partner');
            notificationError$.next(true);
          } else {
            console.log('Exito update partner');
            notificationOK$.next(true);

          }
        }
      );
    }
    let path = '/jsonrpc';
    let client = jayson.https('https://' + host + ':' + port + path);

    let inParams = [];
    inParams.push(usuario.id);
    inParams.push(user_to_update);
    let params = [];
    params.push(inParams);

    let fparams = [];
    fparams.push(db);
    fparams.push(1);
    fparams.push(pass);
    fparams.push('res.users'); //model
    fparams.push('write'); //method

    for (let i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }

    client.request(
      'call',
      { service: 'object', method: 'execute_kw', args: fparams },
      function (err, error, value) {
        if (err || !value) {
          console.log(err, 'Error actualizando usuario o el usuario ya existe');
          notificationError$.next(true);
        } else {
          console.log(value, 'Exito actualizando el usuario');
          updatePatner();
        }
      }
    );


  }

  updateDocuments(document: any) {

    let set_partner_update = function () {

      //let partner_id = flow.get('partnerID')
      let inParams = []
      inParams.push([newUser.partner_id]); //id to update
      inParams.push({ 'docs_check': false });
      let params = []
      params.push(inParams)

      let fparams = [];
      fparams.push(db);
      fparams.push(1);
      fparams.push(pass);
      fparams.push('res.partner');//model
      fparams.push('write');//method

      for (let i = 0; i < params.length; i++) {
        fparams.push(params[i]);
      }

      client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function (err, error, result) {
        if (err) {
          console.log(err, 'Error update Document mensual');
          notificationError$.next(true);
        } else {
          console.log(err, 'Exito update Document mensual');
          notificationOK$.next(true);
        }
      })
    }


    let path = '/jsonrpc';
    let client = jayson.https('https://' + host + ':' + port + path);

    let inParams = []
    inParams.push([newUser.partner_id]); //id to update
    inParams.push({ 'document': document });
    let params = []
    params.push(inParams)

    let fparams = [];
    fparams.push(db);
    fparams.push(1);
    fparams.push(pass);
    fparams.push('res.partner'); //model
    fparams.push('write'); //method


    for (let i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }

    client.request(
      'call',
      { service: 'object', method: 'execute_kw', args: fparams },
      function (err, error, value) {
        if (err) {
          console.log(err, 'Error update Document');
          notificationError$.next(true);
        } else {
          console.log('Exito update Document');
          set_partner_update();
          //notificationOK$.next(true);

        }
      }
    );


  }

  getStripeLink() {

    let reauth_url = 'https://odoo.todoenunapp.com/payment/stripe/reauth'
    let return_url = 'https://odoo.todoenunapp.com/payment/stripe/return'
    let path = '/jsonrpc'
    let client = jayson.https('https://' + host + ':' + port + path);

    //console.log(newUser.partner_id, "partner id link")

    let inParams = []
    inParams.push([newUser.partner_id]);
    //inParams.push([132]);
    inParams.push(reauth_url);
    inParams.push(return_url);
    let params = []
    params.push(inParams)

    let fparams = [];
    fparams.push(db);
    fparams.push(1);
    fparams.push(pass);
    fparams.push('res.partner');//model
    fparams.push('stripe_express_connect_account');//method

    for (let i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }

    client.request('call', { service: 'object', method: 'execute_kw', args: fparams }, function (err, error, value) {
      if (err || !value) {
        console.log(err, 'Error generando link');
        notificationError$.next(true);
      } else {
        console.log(value, 'Exito generando link');
        notificationLink$.next(value.link)
      }
    })
  }

  /*  notificationPull() {
   
    let poll = function (last) {
      let path = '/longpolling/poll';
  
      client = jayson.https({
        host: host,
        port: port + path,
      });
  
      client.request(
        'call',
        {
          context: { uid: newUser.id },
          channels: [db + '_' + newUser.partner_id.toString()],
          last: last,
        },
        { context: { lang: 'es_ES', uid: newUser.id } },
        function (err, error, value) {
          if (err) {
            console.log(err, 'Error poll');
          } else {
            
            if (typeof value !== 'undefined' && value.length > 0) {
             
              console.log(value, 'esta fue la notificacion q llego');
  
              for (let task of value) {
                if (
                  task['message']['type'] === 'purchase_order_notification' &&
                  task['message']['action'] === 'created'
                ) {
                  console.log('se ha creado una nueva So');
                  
                }
               
              }
  
              poll(value[value.length - 1].id);
            }else{
              poll(0);
            }
          }
        }
      );
    };
  
    console.log(newUser.username,"usuario poll");
    console.log(newUser.password,"usuario poll");
  
    let client = jayson.https({
      host: host,
      port: port + pathConnection,
  
  
  
    });
    client.request(
      'call',
      {
        service: 'common',
        method: 'login',
        args: [db, newUser.username, newUser.password],
      },
  
      
  
      function (err, error, value) {
        if (err || !value) {
          console.log(err, 'Error cancelPOsuplier');
        } else {
          poll( 0);
        }
      }
    );
  }  */

  getUserInfo() {
    return newUser;
  }

}
