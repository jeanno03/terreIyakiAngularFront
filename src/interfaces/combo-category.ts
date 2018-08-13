import { Product } from "./product";
import { Combo } from "./combo";
import { Category } from "./category";

export interface ComboCategory {
    id: any;
    number: number;
    theId: any;
    products: Array<Product>;
    combo: Combo;
    category: Category;
}
