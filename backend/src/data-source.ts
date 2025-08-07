import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entitiesPath = path.resolve(__dirname, 'entities', '*.entity.js');
const migrationsPath = path.resolve(__dirname, 'migrations', '*.js');

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  entities: [entitiesPath],
  migrations: [migrationsPath],
  subscribers: [],
});