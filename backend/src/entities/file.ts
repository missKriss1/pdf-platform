import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Folder } from './folder';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @ManyToOne(() => Folder, (folder) => folder.files, { onDelete: 'CASCADE' })
  folder: Folder;
}
