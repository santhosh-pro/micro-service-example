import { SnakeNamingStrategy } from '@app/database/common/snake-naming.strategy';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigurationService {
  constructor() {
    dotenv.config({
      path: `.env`,
    });
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  getPort() {
    return this.getValue('PORT', true);
  }

  isProduction() {
    const mode = this.getValue('MODE', false);
    return mode == 'PROD';
  }

  isDevelopment() {
    const mode = this.getValue('MODE', false);
    return mode == 'DEV';
  }

  isTesting() {
    const mode = this.getValue('MODE', false);
    return mode == 'TEST';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      entities: [__dirname + '/../../database/src/**/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: [__dirname + '/../../database/src/migration/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../../database/src/migration',
      },
      keepConnectionAlive: true,
      type: 'mysql',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      migrationsRun: false,
      synchronize: false,
      logging: !this.isProduction(),
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
