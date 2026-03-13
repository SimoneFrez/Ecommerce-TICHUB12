export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    category: Category;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export type UserRole = "ADMIN" | "CUSTOMER";