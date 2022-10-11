import { Config } from '@providers/config/config.interface';

export const config: Config = {
  app: {
    port: 8080,
  },
  database: {
    name: 'database',
    tables: ['moviesMeta', 'moviesDetail'],
  },
};
