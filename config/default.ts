import { Config } from '@providers/config';

export const config: Config = {
  app: {
    port: 8080, // App port number
  },
  database: {
    dbHome: '', // Write database folder name, Do not attach a slash to the front
    tables: [], // Add table name
  },
};
