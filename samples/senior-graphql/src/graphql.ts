
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Product {
    id?: number;
    name?: string;
}

export abstract class IQuery {
    abstract product(id: string): Product | Promise<Product>;
}
