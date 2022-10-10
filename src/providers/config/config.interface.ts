export type AppConfig = {
  readonly port: number;
};

export type DatabaseConfig = {
  readonly name: string;
};

export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
};
