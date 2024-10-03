import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.configDotenv();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [process.env.ENTITIES_PATH],
  migrations: ['dist/db/migrations/*.js'],
  logging: true
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;