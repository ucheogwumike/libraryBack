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

  @Column()
  filename: string;

  @Column()
  url: string;

  @Column()
  author: string;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.files, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => CategoryEntity, (category) => category.files, {
    onDelete: 'CASCADE',
  })
  category: CategoryEntity;
}
