import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(name: string): Promise<CategoryEntity> {
    const category = this.categoryRepository.create({ name });
    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number): Promise<CategoryEntity> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async updateCategory(id: number, name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    category.name = name;
    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    return this.categoryRepository.remove(category);
  }
}
