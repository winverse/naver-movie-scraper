export type TableNames = 'moviesDetail' | 'moviesMeta';

export type MoviesMeta = {
  id: string;
  movieTitle: string;
  posterImageUrl: string;
  movieCode: string;
};

export type MoviesDetail = {
  id: string;
  movieTitle: string;
  overview: string;
  director: string;
  screenTime: string;
  releaseDate: string;
  plot: string;
  audienceRating: string;
  comments: string[];
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
