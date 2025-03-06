import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "gallery" })
export class GalleryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "name", nullable: true })
    name: string;

    @Column({ type: "varchar", name: "title", nullable: true })
    title: string;

    @Column({ type: "text", name: "image", nullable: true })
    image: string;

    @Column({ type: "text", name: "content", nullable: true })
    content: string;

    @Column({ type: "varchar", name: "category", nullable: true })
    category: string;

    @Column({ type: "varchar", name: "slug", nullable: true })
    slug: string;

    @BeforeInsert()
    @BeforeUpdate()
    async createSlug() {
        const slugModule = await import("slug");
        const slug = slugModule.default;
        this.slug = slug(this.title || "", { lower: true });
    }
}