import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  createCategory(@Body('name') name: string) {
    return this.categoriesService.createCategory(name);
  }

  @Patch()
  updateCategory(@Body('id') id: number, @Body('name') name: string) {
    return this.categoriesService.updateCategory(id, name);
  }

  @Delete()
  deleteCategory(@Body('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
