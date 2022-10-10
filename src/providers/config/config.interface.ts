export type AppConfig = {
  readonly port: number;
};

export type DatabaseConfig = {
  readonly dirPath: string;
};

export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
};
