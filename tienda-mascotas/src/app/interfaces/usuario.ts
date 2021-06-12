import { Comuna } from "./comuna";
import { Region } from "./region";

export interface Usuario {
    correo      : string;
    nombres     : string;
    apellidos   : string;
    rut         : string;
    region      : number;
    comuna      : number;
    password    : string;
}
