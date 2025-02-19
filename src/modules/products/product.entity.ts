import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name:"name", nullable: true })
    name: string;

    @Column({ type: "varchar", name:"price", nullable: true })
    price: number;

    @Column({ type: "varchar", name:"originalPrice", nullable: true })
    originalPrice: number;

    @Column({ type: "varchar", name:"image", nullable: true })
    image: string;

    @Column({ type: "varchar", name:"gallery", nullable: true })
    gallery: string[];

    @Column({ type: "varchar", name:"category", nullable: true })
    category: string;

    @Column({ type: "varchar", name:"description", nullable: true })
    description: string;

    @Column({ type: "varchar", name:"features", nullable: true })
    features: string[];

    @Column({ type: "varchar", name:"weight", nullable: true })
    weight: string;

    @Column({ type: "varchar", name:"origin", nullable: true })
    origin: string;

    @Column({ type: "varchar", name:"holdLevel", nullable: true })
    holdLevel: string;

    @Column({ type: "varchar", name:"shineLevel", nullable: true })
    shineLevel: string;

    @Column({ type: "varchar", name:"ingredients", nullable: true })
    ingredients: string;

    @Column({ type: "varchar", name:"expiry", nullable: true })
    expiry: string;
}
