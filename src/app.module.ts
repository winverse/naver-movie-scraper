import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScraperModule } from './modules/scraper';
import { ConfigModule, configuration } from './providers/config';
import { DBModule } from './providers/db/db.module';
import { HttpExceptionFilter } from '@common/filters';
import { AxiosModule } from './providers/axios/axios.module';
import { UtilsModule } from './providers/utils/utils.module';

@Module({
  imports: [
    NestConfigModule.forRoot({ load: [configuration] }),
    ScraperModule,
    DBModule,
    ConfigModule,
    AxiosModule,
    UtilsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
