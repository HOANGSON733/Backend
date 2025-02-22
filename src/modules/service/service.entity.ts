import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "service" })
export class ServiceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", name: "title", nullable: true })
    title: string;

    @Column({ type: "simple-json", name: "image", nullable: true })
    image: string[]; // ✅ Lưu `image` dưới dạng JSON thay vì chuỗi

    @Column({ type: "varchar", name: "content", nullable: true })
    content: string;

    @Column({ type: "varchar", length: 1000, name: "description", nullable: true })
    description: string;

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
