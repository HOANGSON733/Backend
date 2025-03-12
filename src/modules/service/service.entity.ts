import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "service" })
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "title", nullable: true })
    title: string;

    @Column({ type: "simple-json", name: "image", nullable: true })
    image: string[]; // ✅ Lưu `image` dưới dạng JSON thay vì chuỗi

    @Column({ type: "longtext", name: "content1", nullable: true })
    content1: string;

    @Column({ type: "longtext", name: "description1", nullable: true })
    description1: string;

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
