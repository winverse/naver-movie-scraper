export type AppConfig = {
  readonly port: number;
};

export type TableNames = 'moviesDetail' | 'moviesMeta';
export type DatabaseConfig = {
  readonly name: string;
  readonly tables: TableNames[];
};

export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
};
