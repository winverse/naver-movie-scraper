import { MovieMetaDataFromChart } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@providers/config';
import { TableNames } from '@providers/db/db.interface';
import { UtilsService } from '@providers/utils';
import { JsonDB, Config } from 'node-json-db';
import { zipWith } from 'ramda';

@Injectable()
export class DBService {
  constructor(
    private readonly config: ConfigService,
    private readonly utils: UtilsService,
  ) {}
  get db() {
    const dbName = this.config.get('database.name');
    const dbConfig = new Config(dbName, true, true, '/');
    const json = new JsonDB(dbConfig);
    return json;
  }
  setIdWithData(data: Record<any, any>[]) {
    const ids: string[] = Array(data.length).fill(this.utils.genId);
    const result = zipWith((id, data) => ({ id, ...data }), ids, data);
    return result;
  }
  async save(table: TableNames, data: MovieMetaDataFromChart[]) {
    const rows = this.setIdWithData(data);
    await this.db.push(table, rows);
  }
}
