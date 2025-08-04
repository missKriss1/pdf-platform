import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './../entities/file';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FoldersModule } from '../folders/folders.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), FoldersModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
