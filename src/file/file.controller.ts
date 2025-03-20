import {
  Controller,
  // Post,
  // UseInterceptors,
  // UploadedFile,
  Get,
  Param,
  Res,
  // Req,
  UseGuards,
} from '@nestjs/common';
// import { Multer } from 'multer';
// import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.gaurd';
import { FileService } from './file.service';
import { Response /**Request*/ } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = await this.fileService.getFilePath(filename);
    return res.sendFile(filePath);
  }
}
