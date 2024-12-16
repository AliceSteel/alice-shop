export type Product = {
    id: number;
    brand: string;
    images: string[];
    price: number;
    stock: number;
    color: string;
    size: string[];
    name: {
        dk: string;
        en: string;
    }
}