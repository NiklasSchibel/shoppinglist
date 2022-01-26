//Item Interface für alle ShoppingList Einträge

export interface Item {
    id: string;
    name: string;
    quantity: number;
    user?: string;
}