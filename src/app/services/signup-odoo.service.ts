import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { Observable, Subject } from 'rxjs';
const jayson = require('../../../node_modules/jayson/lib/client/');

// let host = '192.168.0.106';
const host = 'odoo.todoenunapp.com';
//const port = 8069;
const port = 443;
const db = 'demo';
const user = 'root';
const pass = 'root';

const notificationError$ = new Subject<boolean>();

const notificationOK$ = new Subject<boolean>();

@Injectable({
  providedIn: 'root',
})
export class SignUpOdooService {
  constructor() {}

  getNotificationError$(): Observable<boolean> {
    return notificationError$.asObservable();
  }

  getNotificationOK$(): Observable<boolean> {
    return notificationOK$.asObservable();
  }

  show(usuario: UsuarioModel) {
    console.log(usuario, 'sigupClient');
  }

  newUser(usuario: UsuarioModel) {
    console.log(usuario, 'sigupClient');

    let user_to_create;
    let partner_update;
    let id_job;

    if (usuario.type === "fontanero"){
      id_job = 39
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

    console.log(user_to_create);

     let set_partner_update = function (partner_id) {
      //console.log(usuario.partner_id);

      partner_update = {
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
        //'comment':'',//description
        //'function':'',//job title
        //'mobile':'968 88 88 88',
        is_company: usuario.is_company, //individual person or company
        //'vat_cif':'', //CIF number
        social_security: usuario.social_security, //Social security number
        //'iae_code' :'', //I.A.E code
        dni: usuario.dni, //DNI number
        bank_ids: [[0, 0, { acc_number: usuario.bank_ids }]], //bank account with iban format

        product_supply_ids: [
          //subscripciones para ser supplier
          [
            0,
            0,
            {
              name: usuario.partner_id,
              product_tmpl_id: id_job, //template_id optenido del servicio del que va a ser supplier
            },
          ],
        ],
      };

      let inParams = [];
      inParams.push([partner_id]); //id to update
      inParams.push(partner_update);
      let params = [];
      params.push(inParams);

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
            console.log(err, 'Error actualizando campos usuario');
            notificationError$.next(true);
          } else {
            console.log('actualizando campos usuario exito');
            notificationOK$.next(true);
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
          set_partner_update(value);
        }
      }
    );
  }
}
