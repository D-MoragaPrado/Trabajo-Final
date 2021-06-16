import { Producto } from "./producto";

export interface CarroCompra {
    productos: Array<Producto>;
    cantidadProductos : Array<number>;
}

export let Carro : CarroCompra;