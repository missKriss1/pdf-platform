import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderDto } from './../dto/folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  async getAll() {
    return this.foldersService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const folder = await this.foldersService.findOne(+id);
    if (!folder) {
      throw new NotFoundException('Папка не найдена');
    }
    return folder;
  }

  @Post()
  async create(@Body() createFolderDto: FolderDto) {
    if (!createFolderDto.name || createFolderDto.name.trim() === '') {
      throw new BadRequestException('Название папки обязательно');
    }
    return this.foldersService.create(createFolderDto);
  }
}
