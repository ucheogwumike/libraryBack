import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UploadedFile,
  UseInterceptors,
  Body,
  Query,
  Patch,
  // Delete,
  // Req,
  // UseGuards,
} from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/role.gaurd';
import { FileService } from './file.service';
import { Response /**Request*/ } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  //   @Post('upload')
  //   @UseInterceptors(FileInterceptor('file'))
  //   async uploadFile(@UploadedFile() file: Multer.File, @Req() req: Request) {
  //     // const user = req.user as User;
  //     const userId = req?.user?.id; // Ensure authentication middleware sets req.user
  //     return this.fileService.saveFile(file, userId);
  //   }

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'uploads'); // Save files in the "uploads" directory
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname)); // Generate a unique file name
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Multer.File,
    @Body() body,
    @Query('cover') cover?: boolean,
    // @Req() req: Request,
  ) {
    if (cover) {
      console.log(file);
      console.log(body);
      body.file = file;
      return this.fileService.addImage(body);
    } else {
      body.file = file;
      return this.fileService.saveFile(body);
    }

    // {
    //   message: 'File uploaded successfully!',
    //   filePath: `/uploads/${file.filename}`,
    // };
  }

  @Get('/one')
  async getDocument(@Query('id') id: number) {
    return this.fileService.findOne(id);
  }

  @Patch()
  updateCategory(@Body() body) {
    console.log(body);
    return this.fileService.editFile(body);
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = await this.fileService.getFilePath(filename);
    return res.sendFile(filePath);
  }

  @Get()
  async getPaginatedItems(
    @Query('page') page: number,
    @Query('limit') limit: number = 10,
    @Query('name') name?: string,
    @Query('status') status?: string,
    @Query('category') category?: number,
  ) {
    return this.fileService.findAll(Number(page), Number(limit), {
      name,
      status,
      category,
    });
  }
}
