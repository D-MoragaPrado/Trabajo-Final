export interface Categoria {
    name : string;
    checked : boolean;
    sub_categoria?: Categoria[];
  }