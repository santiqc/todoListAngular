export interface ResponseDTO {
    mensaje:         string;
    codigoRespuesta: number;
    data:            Data;
}

export interface Data {
    id:               number;
    nameTark:         string;
    description:      string;
    status:           string;
    priority:         string;
    created:          Date;
    lastModifiedDate: null;
}
