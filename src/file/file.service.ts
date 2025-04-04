import { Injectable, NotFoundException } from '@nestjs/common';
// import { Multer } from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { FileEntity } from './file.entity';
import { User } from '../users/user.entity';
import { CategoryEntity } from 'src/categories/categories.entity';
import { join } from 'path';
import { existsSync } from 'fs';

export enum FileStatus {
  PUBLISHED = 'published',
  UPLOADED = 'uploaded',
  RECALLED = 'recalled',
}

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

  async addImage(body: any) {
    const existingFile = await this.fileRepository.findOne({
      where: { id: body.id },
    });

    const url = `/uploads/${body.file.filename}`;
    if (existingFile) {
      await this.fileRepository.update(
        { id: existingFile.id },
        {
          coverPage: url,
        },
      );

      return { sucess: true, message: 'Document updated' };
    }
  }

  async editFile(body: any) {
    console.log(body);
    const category = await this.categoryRepository.findOne({
      where: { id: body?.category.id },
    });

    // const fileUrl = `/uploads/${body.file.filename}`;
    const existingFile = await this.fileRepository.findOne({
      where: { id: body.id },
    });

    if (existingFile) {
      existingFile.filename = body?.filename;
      existingFile.author = body?.author;
      existingFile.category = category;
      existingFile.type = body?.type;
      existingFile.status = body?.status;

      await this.fileRepository.update(
        { id: existingFile.id },
        {
          filename: existingFile.filename,
          author: existingFile.author,
          category: existingFile.category,
          type: existingFile.type,
          status: existingFile.status,
        },
      );
      return { sucess: true, message: 'Document updated' };
    }
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

  async findOne(id: number): Promise<FileEntity | undefined> {
    return this.fileRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async findAll(
    page: number,
    limit: number = 10,
    filters?: { name?: string; status?: string; category?: number },
  ) {
    const where: FindOptionsWhere<FileEntity> = {};

    // Apply filters dynamically if provided
    if (filters?.name) {
      where.filename = ILike(`%${filters.name}%`); // Case-insensitive search
    }
    if (filters?.status) {
      where.status = filters.status as FileStatus; // Exact match
    }
    if (filters?.category) {
      const cat = await this.categoryRepository.findOne({
        where: { id: filters.category },
      });
      where.category = cat; // Exact match
    }

    const [data, total] = await this.fileRepository.findAndCount({
      where,
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
