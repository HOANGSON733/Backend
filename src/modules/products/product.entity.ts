import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "name", nullable: true })
    name: string;

    @Column({ type: "int", name: "price", nullable: true }) // Đổi từ varchar sang int
    price: number;

    @Column({ type: "int", name: "originalPrice", nullable: true }) // Đổi từ varchar sang int
    originalPrice: number;

    @Column({ type: "varchar", name: "image", nullable: true })
    image: string;

    @Column({ type: "text", name: "gallery", nullable: true })
    gallery: string; // Lưu dưới dạng JSON string

    @Column({ type: "varchar", name: "category", nullable: true })
    category: string;

    @Column({ type: "varchar", name: "description", nullable: true })
    description: string;

    @Column({ type: "text", name: "features", nullable: true })
    features: string; // Lưu dưới dạng JSON string

    @Column({ type: "varchar", name: "weight", nullable: true })
    weight: string;

    @Column({ type: "varchar", name: "origin", nullable: true })
    origin: string;

    @Column({ type: "varchar", name: "holdLevel", nullable: true })
    holdLevel: string;

    @Column({ type: "varchar", name: "shineLevel", nullable: true })
    shineLevel: string;

    @Column({ type: "varchar", name: "ingredients", nullable: true })
    ingredients: string;

    @Column({ type: "date", name: "expiry", nullable: true })
    expiry: string;

    @Column({ type: "varchar", name: "slug", nullable: true })
    slug: string;

    @BeforeInsert()
    @BeforeUpdate()
    async createSlug() {
        const slugModule = await import("slug");
        const slug = slugModule.default;
        this.slug = slug(this.name || "", { lower: true });
    }
}
