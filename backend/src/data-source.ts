import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Folder } from './entities/folder';
import { File } from './entities/file';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  migrationsRun: true,
  entities: [Folder, File],
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
