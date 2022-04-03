/* eslint-disable @typescript-eslint/no-var-requires */
const SnakeNamingStrategy =
  require('typeorm-naming-strategies').SnakeNamingStrategy;
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.${process.env.NODE_ENV}.env`,
});
console.log(process.env.DB_HOST, '<=============');
module.exports = {
  entities: ['libs/infra/database/src/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration',
  migrations: ['libs/database/src/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'libs/database/src/migration',
  },
  keepConnectionAlive: true,
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsRun: false,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};
