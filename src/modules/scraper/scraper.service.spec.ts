import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosService } from '@providers/axios';
import { DBService } from '@providers/db';
import { UtilsService } from '@providers/utils';
import { mockBoxOfficeMovies, mockMovieMetaData } from 'test/mock';
import {
  StubAxiosService,
  stubAxiosService,
  stubDBService,
  stubUtilsService,
} from 'test/stub/providers';
import { ScraperService } from './scraper.service';

describe('ScraperService', () => {
  let scraperService: ScraperService;
  let axiosService: StubAxiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScraperService,
        { provide: AxiosService, useValue: stubAxiosService },
        { provide: DBService, useValue: stubDBService },
        { provide: UtilsService, useValue: stubUtilsService },
      ],
    }).compile();

    scraperService = module.get<ScraperService>(ScraperService);
    axiosService = module.get(AxiosService);
  });

  it('should be defined', () => {
    expect(scraperService.getTop10MoviesMetaData).toBeDefined();
    expect(scraperService.getMovieDetails).toBeDefined();
  });
  describe('[GET] /', () => {
    describe('[Success]', () => {
      it('Should return movies meta data', async () => {
        axiosService.get.mockResolvedValue({
          data: mockBoxOfficeMovies,
          status: 200,
        });
        const result = await scraperService.getTop10MoviesMetaData();
        expect(result).toEqual(mockMovieMetaData);
      });
    });
    describe('[Failure]', () => {
      it('Should throw Internal server Error', async () => {
        axiosService.get.mockRejectedValue({
          data: [],
          status: 404,
        });
        try {
          await scraperService.getTop10MoviesMetaData();
        } catch (error) {
          expect(error).toBeInstanceOf(InternalServerErrorException);
        }
      });
    });
  });
});
