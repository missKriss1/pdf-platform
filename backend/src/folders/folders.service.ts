import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './../entities/folder';
import { Repository } from 'typeorm';
import { FolderDto } from './../dto/folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,
  ) {}

  async findAll(): Promise<Folder[]> {
    return this.foldersRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Folder | null> {
    const folder = await this.foldersRepository.findOne({ where: { id } });
    return folder ?? null;
  }

  async create(createFolderDto: FolderDto): Promise<Folder> {
    const folder = this.foldersRepository.create({
      name: createFolderDto.name,
      createdAt: new Date(),
    });
    return this.foldersRepository.save(folder);
  }
}
