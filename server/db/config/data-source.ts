import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: 'mediko',
  password: '*mediko_password*',
  database: 'mediko',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;