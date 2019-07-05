import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({
    name: 'hotelInfo',
})
export class Product {
    @ObjectIdColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public description: string;
}