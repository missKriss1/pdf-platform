import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './../entities/file';
import { Repository } from 'typeorm';
import { FileParams } from '../types';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async findAll(): Promise<File[]> {
    return this.filesRepository.find({
      order: { uploadedAt: 'DESC' },
      relations: ['folder'],
    });
  }

  async findByFolderId(folderId: number): Promise<File[]> {
    return this.filesRepository.find({
      where: { folder: { id: folderId } },
      order: { uploadedAt: 'DESC' },
      relations: ['folder'],
    });
  }

  async create(params: FileParams): Promise<File> {
    const file = this.filesRepository.create({
      name: params.name,
      path: params.path,
      folder: { id: params.folderId },
    });
    return this.filesRepository.save(file);
  }
}
