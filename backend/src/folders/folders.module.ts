import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './../entities/folder';
import { File } from './../entities/file';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, File])],
  controllers: [FoldersController],
  providers: [FoldersService],
  exports: [FoldersService],
})
export class FoldersModule {}
