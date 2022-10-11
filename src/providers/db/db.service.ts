import { Injectable } from '@nestjs/common';
import { ConfigService, TableNames } from '@providers/config';
import { UtilsService } from '@providers/utils';
import { zipWith } from 'ramda';
import { FsService } from '@providers/fs';
import { Schema } from '@providers/db/db.interface';

@Injectable()
export class DBService {
  constructor(
    private readonly config: ConfigService,
    private readonly utils: UtilsService,
    private readonly fs: FsService,
  ) {}
  get tableFilePath(): Record<TableNames, string> {
    const dbName = this.config.get('database.name');
    const tableNames = this.config.get('database.tables');
    return tableNames.reduce(
      (result, table) =>
        Object.assign(result, {
          [table]: this.fs.getFilePathWithCwd(`${dbName}/${table}.json`),
        }),
      {} as any,
    );
  }
  private setIdWithData(data: Record<any, any>[]) {
    const ids = Array(data.length).fill(this.utils.genId);
    const result = zipWith((id, data) => ({ id, ...data }), ids, data);
    return result;
  }
  private selectTable(tableName: TableNames) {
    const filePath = this.tableFilePath[tableName];
    const data = this.fs.readFileSync(filePath);

    console.log(data);
    return JSON.parse(data);
  }
  async insert(tableName: TableNames, data: Schema<TableNames>[]) {
    const existsRows = this.selectTable(tableName);
    const newRows = this.setIdWithData(data);
    const rows = existsRows.concat(newRows);
    const filePath = this.tableFilePath[tableName];
    this.fs.writeFileSync(filePath, rows);
  }
}
