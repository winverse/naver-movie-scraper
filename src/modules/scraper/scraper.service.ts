import { AxiosService } from '@providers/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BoxOfficeChartList } from '@common/interfaces';
import { DBService } from '@providers/db';
import { FAILED_GET_MOVIE_DATA } from '@constants/errors.constants';
import {
  MOVIE_DETAIL_DEFAULT_HOST,
  POST_URL_DEFAULT_HOST,
} from '@constants/naver.constants';
import { UtilsService } from '@providers/utils';
import cheerio from 'cheerio';

@Injectable()
export class ScraperService {
  constructor(
    private readonly axios: AxiosService,
    private readonly db: DBService,
    private readonly utils: UtilsService,
  ) {}
  // 탑 10 무비 링크 가져오기
  async saveTop10MoviesLink() {
    try {
      const movies = await this.axios.get<BoxOfficeChartList>(
        'https://movie.naver.com/movieChartJson.naver?type=BOXOFFICE',
        {
          headers: {
            referer: 'https://movie.naver.com/',
          },
        },
      );

      if (movies.status !== 200) {
        throw new Error(FAILED_GET_MOVIE_DATA);
      }

      const { BOXOFFICE } = movies.data.movieChartList;

      const movieMetaData = BOXOFFICE.map(movie => ({
        movieTitle: movie.movieTitle,
        posterImageUrl: `${POST_URL_DEFAULT_HOST}${movie.posterImageUrl}`,
        detailUrl: `${MOVIE_DETAIL_DEFAULT_HOST}${movie.movieCode}`,
        movieCode: movie.movieCode,
      }));

      return movieMetaData;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  // 영화 상세 정보 가져오기
  async getMovieDetails() {
    try {
      const rows = await this.db.findAll('moviesMeta');
      const result = [];
      for (const row of rows) {
        // scrap mananer
        await this.utils.sleep(500);
        const { data } = await this.axios.get<string>(row.detailUrl, {
          headers: {
            referer: 'https://movie.naver.com/',
          },
        });

        const $ = cheerio.load(data);
        const movieTitle = $('.h_movie > a').text();

        const overview = $('.info_spec > dd > p > span')
          .toArray()
          .map(el =>
            $(el)
              .text()
              .replace(/[\t|\n]/g, '')
              .trim(),
          );

        const genre = overview[0];
        const screenTime = overview[2];
        const releaseDate = overview[3];
        const director = $('.info_spec > dd:nth-child(4)').text();
        const plot = $('.con_tx').text().replace(/\xa0/g, '\n').trim();
        const audienceRating = $('.star_score > em').text().slice(0, 5);

        const details = {
          movieTitle,
          genre,
          screenTime,
          releaseDate,
          director,
          plot,
          audienceRating,
        };

        result.push(details);
      }

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
