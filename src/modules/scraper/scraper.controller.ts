import { ScraperService } from './scraper.service';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller({
  path: '/scrapers',
  version: ['1'],
})
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @Get('/ranker-links')
  async getRankerMovies(@Res() reply: FastifyReply) {
    await this.scraperService.saveTop10MoviesLink();
    reply.status(HttpStatus.OK).send('Ok');
  }
}
