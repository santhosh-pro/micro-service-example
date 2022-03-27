import { ConfigurationModule, ConfigurationService } from '@app/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

export const dataBaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigurationModule],
  useFactory: (configService: ConfigurationService) =>
    configService.getTypeOrmConfig(),
  inject: [ConfigurationService],
});
