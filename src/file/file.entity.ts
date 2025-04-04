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

  @Column()
  url: string;

  @Column()
  author: string;

  @Column()
  type: string;

  @Column()
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
