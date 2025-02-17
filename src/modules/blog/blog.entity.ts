import { AfterUpdate, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import slug from 'slug'

@Entity({ name: "Blog" })
export class BlogEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column({ type: "text", name: "content", nullable: true })
    content: string

    @Column({ type: "varchar", name: "image", nullable: true })
    image: string
    
    @Column({ type: "varchar", name: "title", nullable: true })
    title: string

    @Column({ type: "varchar", name: "description", nullable: true })
    description: string

    @Column({ type: "varchar", name: "slug", nullable: true })
    slug: string

    @BeforeInsert()
    @BeforeUpdate()
    createSlug() {
        this.slug = slug(this.title)
    }
}
