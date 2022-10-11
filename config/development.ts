import { Config } from '@providers/config';

export const config: Config = {
  app: {
    port: 8080,
  },
  database: {
    dbHome: 'database',
    tables: ['moviesMeta', 'moviesDetail'],
  },
};
