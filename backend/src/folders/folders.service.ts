import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from '../entities/folder.entity';
import { File } from '../entities/file.entity';
import { Repository } from 'typeorm';
import { FolderDto } from '../dto/folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async findFilesInFolder(folderId: number) {
    const folderExists = await this.foldersRepository.findOne({
      where: { id: folderId },
    });

    if (!folderExists) {
      throw new NotFoundException(`Папка с ID ${folderId} не найдена`);
    }
    return this.filesRepository
      .createQueryBuilder('file')
      .where('file.folder_id = :folderId', { folderId })
      .orderBy('file.uploaded_at', 'DESC')
      .getMany();
  }

  async findAllWithFiles(): Promise<Folder[]> {
    return this.foldersRepository.find({
      relations: ['files'],
      order: { createdAt: 'DESC', files: { uploadedAt: 'DESC' } },
    });
  }

  async create(createFolderDto: FolderDto): Promise<Folder> {
    const folder = this.foldersRepository.create({
      name: createFolderDto.name,
      createdAt: new Date(),
    });
    return this.foldersRepository.save(folder);
  }
}
