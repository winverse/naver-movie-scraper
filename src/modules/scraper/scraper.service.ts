import { AxiosService } from '@providers/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BoxOfficeChartList } from '@common/interfaces';
import { DBService } from '@providers/db';
import { FAILED_GET_MOVIE_DATA } from '@constants/errors.constants';

@Injectable()
export class ScraperService {
  constructor(
    private readonly axios: AxiosService,
    private readonly db: DBService,
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
        posterImageUrl: `https://movie-phinf.pstatic.net/${movie.posterImageUrl}`,
        movieCode: movie.movieCode,
      }));

      await this.db.create('moviesMeta', movieMetaData);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
