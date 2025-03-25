import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";

@Entity({ name: "BannerEntity" })
export class BannerEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number

    @Column({ type: "varchar", name: "title", nullable: true })
    title: string

    @Column({ type: "varchar", name: "image", nullable: true })
    image: string
    
    // @BeforeInsert()
    // @BeforeUpdate()
    // async createSlug() {
    //     const slug = (await import("slug")).default;
    //     this.slug = slug(this.title);
    // }
}
