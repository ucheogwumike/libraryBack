import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './categories.entity';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
