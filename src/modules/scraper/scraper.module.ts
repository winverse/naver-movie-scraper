import { AxiosModule } from './../../providers/axios/axios.module';
import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { DBModule } from '@providers/db';

@Module({
  imports: [AxiosModule, DBModule],
  providers: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
