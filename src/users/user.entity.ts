import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FileEntity } from '../file/file.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole; // Assign roles

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => FileEntity, (file) => file.user)
  files: FileEntity[]; // A user can have multiple files
}
