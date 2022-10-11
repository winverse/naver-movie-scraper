import { ScraperService } from './scraper.service';
import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { DBService } from '@providers/db';

@Controller({
  path: '/scrapers',
  version: ['1'],
})
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly db: DBService,
  ) {}
  @Get('/ranker-links')
  async getRankerMovies(@Res() reply: FastifyReply) {
    const data = await this.scraperService.getTop10MoviesLink();
    await this.db.create('moviesMeta', data);
    reply.status(HttpStatus.OK).send('Ok');
  }
  @Get('/details')
  async getMovieDetail(@Res() reply: FastifyReply) {
    const data = await this.scraperService.getMovieDetails();
    await this.db.create('moviesDetail', data);
    reply.status(HttpStatus.OK).send('Ok');
  }
}
