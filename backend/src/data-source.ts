import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

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
