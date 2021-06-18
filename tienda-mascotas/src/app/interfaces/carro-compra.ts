import { Producto } from "./producto";

export interface CarroCompra {
    producto: Producto;
    cantidadProducto : number;
}

export let Carro : Array<CarroCompra>=[];