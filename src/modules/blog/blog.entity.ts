import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity({ name: "Blog" })
export class BlogEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column({ type: "varchar", name: "name", nullable: true })
    name: string

    @Column({ type: "varchar", name: "title", nullable: true })
    title: string

    @Column({ type: "varchar", name: "image", nullable: true })
    image: string

    @Column({ type: "text", name: "content", nullable: true })
    content: string


    @Column({ type: "text", name: "description", nullable: true })
    description: string

    @Column({ type: "varchar", name: "slug", nullable: true })
    slug: string

    @BeforeInsert()
    @BeforeUpdate()
    async createSlug() {
        const slug = (await import("slug")).default;
        this.slug = slug(this.title);
    }
}
