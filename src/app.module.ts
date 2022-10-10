import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ScraperModule } from './modules/scraper';
import { ConfigModule, ConfigService, configuration } from './providers/config';
import { DbModule } from './providers/db/db.module';

@Module({
  imports: [
    NestConfigModule.forRoot({ load: [configuration] }),
    ScraperModule,
    DbModule,
    ConfigModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
