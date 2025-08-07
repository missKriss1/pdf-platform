import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './../entities/file.entity';
import { Repository } from 'typeorm';
import { FileParams } from '../types';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async findAllGroupedByDate(): Promise<Record<string, File[]>> {
    const files = await this.filesRepository.find({
      order: { uploadedAt: 'DESC' },
      relations: ['folder'],
    });
    return files.reduce(
      (acc, file) => {
        const dateKey = file.uploadedAt.toISOString().slice(0, 10);
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(file);
        return acc;
      },
      {} as Record<string, File[]>,
    );
  }

  async create(params: FileParams): Promise<File> {
    const file = this.filesRepository.create({
      name: params.name,
      path: params.path,
      folder: { id: params.folderId },
      uploadedAt: new Date(),
    });
    return this.filesRepository.save(file);
  }
}
