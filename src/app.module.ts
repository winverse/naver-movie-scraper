import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScraperModule } from './modules/scraper';
import { HttpExceptionFilter } from '@common/filters';
import { ConfigModule, configuration } from './providers/config';
import { DBModule } from './providers/db';
import { AxiosModule } from './providers/axios';
import { UtilsModule } from './providers/utils';
import { CoreModule } from './providers/core';
import { FsModule } from './providers/fs/fs.module';

@Module({
  imports: [
    NestConfigModule.forRoot({ load: [configuration], cache: true }),
    ConfigModule,
    ScraperModule,
    DBModule,
    AxiosModule,
    UtilsModule,
    CoreModule,
    FsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
