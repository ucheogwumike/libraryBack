import { Injectable, NotFoundException } from '@nestjs/common';
// import { Multer } from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import { User } from '../users/user.entity';
import { CategoryEntity } from 'src/categories/categories.entity';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}
  async saveFile(body: any) {
    // if (!userId) throw new NotFoundException('User not found');

    // const user = await this.userRepository.findOne({ where: { id: userId } });
    // if (!user) throw new NotFoundException('User not found');

    const category = await this.categoryRepository.findOne({
      where: { id: body.category },
    });

    const fileUrl = `/uploads/${body.file.filename}`;
    const newFile = this.fileRepository.create({
      filename: body.name,
      url: fileUrl,
      type: 'document',
      category,
      //user,
    });
    return this.fileRepository.save(newFile);
  }

  async getFilePath(filename: string): Promise<string> {
    const file = await this.fileRepository.findOne({ where: { filename } });
    if (!file) throw new NotFoundException('File not found');

    const filePath = join(__dirname, '../../uploads', filename);
    if (!existsSync(filePath))
      throw new NotFoundException('File does not exist on server');

    return filePath;
  }

  async getAllFiles(): Promise<FileEntity[]> {
    return this.fileRepository.find();
  }
}
