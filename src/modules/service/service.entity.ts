import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Service" })

export class ServiceEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column({ type: "varchar", name: "title", nullable: true })
    title: string

    @Column({ type: "varchar", name: "image", nullable: true })
    image: string

    @Column({ type: "varchar", name: "content", nullable: true })
    content: string

    @Column({ type: "varchar", name: "description", nullable: true })
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