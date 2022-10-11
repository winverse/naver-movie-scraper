export type TableNames = 'moviesDetail' | 'moviesMeta';

export type MoviesMeta = {
  id: string;
  movieTitle: string;
  posterImageUrl: string;
  movieCode: string;
  detailUrl: string;
};

export type MoviesDetail = {
  id: string;
  movieTitle: string;
  genre: string;
  screenTime: string;
  releaseDate: string;
  director: string;
  plot: string;
  audienceRating: string;
};

export type CreateOrUpdateInput<T extends TableNames> = T extends 'moviesMeta'
  ? Omit<MoviesMeta, 'id'>
  : T extends 'MoviesDetail'
  ? Omit<MoviesDetail, 'id'>
  : never;

export type TableSchema<T extends TableNames> = T extends 'moviesMeta'
  ? MoviesMeta
  : T extends 'MoviesDetail'
  ? MoviesDetail
  : never;
