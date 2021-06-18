export interface Producto {
    id              : number;
    nombre          : string;
    categoria_principal_id : number;
    subcategoria_id    : number;
    src_imagen      : string;
    precio          : number;
    stock           : number;
    comentarios     : Array<string>;
    calificacion    : number;
    descripcion     : string;
}
