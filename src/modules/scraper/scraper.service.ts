import { AxiosService } from '@providers/axios';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
  async getTop10MoviesMetaData() {
    try {
      const { data, status } = await this.axios.get<BoxOfficeChartList>(
        'https://movie.naver.com/movieChartJson.naver?type=BOXOFFICE',
        {
          headers: {
            referer: 'https://movie.naver.com/',
          },
        },
      );

      if (status !== 200) {
        throw new Error(FAILED_GET_MOVIE_DATA);
      }

      const { BOXOFFICE } = data.movieChartList;

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
  async getMovieDetails() {
    try {
      const rows = await this.db.findAll('moviesMeta');

      if (rows.length === 0) {
        throw new ConflictException(
          'Url 정보가 존재하지 않습니다.\nTop10 영화 데이터를 먼저 불러와주세요.',
        );
      }

      const result = [];
      for (const row of rows) {
        // scraper mananer
        await this.utils.sleep(100);
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
