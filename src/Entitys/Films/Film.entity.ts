import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { UserEntity } from '../User/User.entity';


@Entity({ name: 'films' })
export class FilmEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, userEntity => userEntity.films, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user: UserEntity;

    @Column({ name: 'name', length: 255, nullable: false })
    name: string;

    @Column({ name: 'genre', length: 70, nullable: false })
    genre: string;

    @Column({ name: 'sinopse', length: 255, nullable: false })
    sinopse: string;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at', nullable: false })
    deletedAt: string;
}