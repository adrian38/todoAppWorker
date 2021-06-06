export class Address {
  street: string;
  number: string;
  portal: string;
  stair: string;
  floor: string;
  door: string;
  cp: string;
  latitude: string;
  longitude: string;

  constructor() {
    this.street = '';
    this.number = '';
    this.portal = '';
    this.stair = '';
    this.floor = '';
    this.door = '';
    this.cp = '';
    this.latitude = '';
    this.longitude = '';
  }
}

export class UsuarioModel {
  username: string;
  password: string;
  name: string;
  connection_id: number;
  partner_id: number
  type: string;
  connected: boolean;
  phone: number;
  id: number;
  realname: string;
  address: Address;
  date: string;
  avatar: any;
  vat:string; //NIF
  comment:string;//description
  //function':'',//job title
  //mobile
  is_company:boolean;//individual person or company
  //vat_cif:number, //CIF number
  social_security:string; //Social security number
  //iae_code:string; //I.A.E code
  dni:string; //DNI number
  bank_ids:string;



  constructor() {
    this.username = "";
    this.password = "";
    this.name = "";
    this.connection_id = 0;
    this.partner_id = 0;
    this.type = "";
    this.connected = false;
    this.phone = 0;
    this.id = 0;
    this.realname = "";
    this.date = "";
    this.avatar = "";
    this.vat=""; //NIF
    this.comment="";//description
  //function':'',//job title
  //phone
    this.is_company=false;//individual person or company
  //vat_cif:number, //CIF number
    this.social_security=""; //Social security number
  //iae_code:string; //I.A.E code
    this.dni = ""; //DNI number
    this.bank_ids = "";

  }
}

