import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { FilmEntity } from '../Films/Film.entity';
import { Exclude } from 'class-transformer';


@Entity({ name: 'users' })
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 125, nullable: false })
    name: string;

    @Column({ name: 'email', length: 70, nullable: false })
    email: string;

    @Exclude()
    @Column({ name: 'password', length: 255, nullable: false })
    password: string;
    
    @OneToMany(() => FilmEntity, filmEntity => filmEntity.user, { cascade: true, eager: true })
    films: FilmEntity[];

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at', nullable: false })
    deletedAt: string;
}