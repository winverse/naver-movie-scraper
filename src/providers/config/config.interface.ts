import { TableNames } from '@providers/db/db.interface';

export type AppConfig = {
  readonly port: number;
};

export type DatabaseConfig = {
  readonly dbHome: string;
  readonly tables: TableNames[];
};

export type Config = {
  app: AppConfig;
  database: DatabaseConfig;
};
