import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderDto } from './../dto/folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get(':id/files')
  async findFiles(@Param('id') folderId: string) {
    return this.foldersService.findFilesInFolder(+folderId);
  }

  @Get('with-files')
  async getAllWithFiles() {
    return this.foldersService.findAllWithFiles();
  }

  @Post()
  async create(@Body() createFolderDto: FolderDto) {
    if (!createFolderDto.name || createFolderDto.name.trim() === '') {
      throw new BadRequestException('Название папки обязательно');
    }
    return this.foldersService.create(createFolderDto);
  }
}
