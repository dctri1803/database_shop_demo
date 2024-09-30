import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const DatabaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false, // disable rejection of unauthorized certificates, optional
  },
}
const AppDataSource = new DataSource({
  ...DatabaseConfig,
  migrations: process.env.NODE_ENV === 'production'
  ? ['./dist/src/database/migrations/*.js'] // Use JS files in production
  : ['./src/database/migrations/*.ts'],
});
export default AppDataSource;
