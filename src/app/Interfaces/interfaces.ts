
export interface ChatDetails {
    userID: string;
    timeStamp: number; // time_t
    isLastMessage: boolean;
    message: string;
    date: string; //es el timeStamp llevado a un string de tiempo
}

export interface Solicitud {
    titulo: string;
    fecha: string;
    horario: string;
    foto: string;
}

export interface Servicio {
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
    horario: string;
    foto: string;
    numeroOrden: string;
    precio: string;
}

export interface Photo {
    filepath: string;
    webviewPath: string;
} 

export interface City {
    name: string,
    //code: string
}

export interface Empresa {
    name: string,
    //code: string
}



