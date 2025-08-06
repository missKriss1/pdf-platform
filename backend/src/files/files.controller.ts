import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FilesService } from './files.service';
import { FoldersService } from '../folders/folders.service';

@Controller('files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    private foldersService: FoldersService,
  ) {}

  @Get('grouped-by-date')
  async getFilesGroupedByDate() {
    return this.filesService.findAllGroupedByDate();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          cb(null, `pdf-${uniqueSuffix}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(
            new BadRequestException('Можно загружать только PDF файлы'),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { folderId: number; name?: string },
  ) {
    if (!file) {
      throw new BadRequestException('Файл не загружен');
    }
    if (!body.folderId) {
      throw new BadRequestException('Не указана папка для загрузки');
    }

    const folder = await this.foldersService.findFilesInFolder(body.folderId);
    if (!folder) {
      throw new NotFoundException('Папка для загрузки не найдена');
    }

    const savedFile = await this.filesService.create({
      name: body.name?.trim() || file.originalname,
      path: file.path,
      folderId: body.folderId,
    });

    return {
      message: 'Файл успешно загружен',
      file: savedFile,
    };
  }
}
