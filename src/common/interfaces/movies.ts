export type MovieMetaDataFromChart = {
  movieTitle: string;
  posterImageUrl: string;
  movieCode: string;
};

export type BoxOfficeChartList = {
  movieChartList: {
    BOXOFFICE: MovieMetaDataFromChart[];
  };
};
