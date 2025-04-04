import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { CategoryEntity } from 'src/categories/categories.entity';

@Entity({ name: 'files' })
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  filename: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  coverPage: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({ default: 'uploaded' })
  status: string;

  @ManyToOne(() => User, (user) => user.files, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => CategoryEntity, (category) => category.files, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
}
