import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from './../entities/folder.entity';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column({ name: 'uploaded_at', type: 'timestamp' })
  uploadedAt: Date;

  @ManyToOne(() => Folder, (folder) => folder.files)
  @JoinColumn({ name: 'folder_id' })
  folder: Folder;
}
