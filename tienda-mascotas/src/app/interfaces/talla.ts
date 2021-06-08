export interface Talla {
    numero_talla    : string;
    largo_cm        : number;
    pecho_cm        : number;
    peso_ideal      : string;
}

export const ListadoTallas:Array<Talla> = 
    [
        {
            numero_talla : "XXS",
            largo_cm : 15,
            pecho_cm : 25,
            peso_ideal : "0.65-1.2kg"
        },
        {
            numero_talla : "XS",
            largo_cm : 20,
            pecho_cm : 30,
            peso_ideal : "1.2-2.0kg"
        },
        {
            numero_talla : "S",
            largo_cm : 25,
            pecho_cm : 35,
            peso_ideal : "2.0-3.0kg"
        },
        {
            numero_talla : "M",
            largo_cm : 30,
            pecho_cm : 40,
            peso_ideal : "3.0-4.25kg"
        },
        {
            numero_talla : "L",
            largo_cm : 35,
            pecho_cm : 45,
            peso_ideal : "4.25-6.0kg"
        },
        {
            numero_talla : "XL",
            largo_cm : 40,
            pecho_cm : 50,
            peso_ideal : "6.0-8.0kg"
        },
        {
            numero_talla : "XXL",
            largo_cm : 45,
            pecho_cm : 60,
            peso_ideal : "8.0-10.0kg"
        }
    ]
