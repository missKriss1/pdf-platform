import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { File } from './../entities/file.entity';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => File, (file) => file.folder)
  files: File[];
}
