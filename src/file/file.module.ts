import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { FileEntity } from './file.entity';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { User } from '../users/user.entity';
import { CategoryEntity } from 'src/categories/categories.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity, User, CategoryEntity]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
