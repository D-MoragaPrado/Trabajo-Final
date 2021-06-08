export interface Producto {
    id              : number;
    nombre          : string;
    categoria       : string;
    subcategoria    : string;
    src_imagen      : string;
    precio          : number;
    stock           : number;
    comentarios     : Array<string>;
    calificacion    : any;
    talla           : Array<string>;
}
