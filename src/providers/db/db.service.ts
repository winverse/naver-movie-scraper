import { Injectable } from '@nestjs/common';
import { ConfigService } from '@providers/config';
import { UtilsService } from '@providers/utils';
import { zipWith } from 'ramda';
import { FsService } from '@providers/fs';
import {
  CreateOrUpdateInput,
  TableSchema,
  TableNames,
} from '@providers/db/db.interface';

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
  private setIdWithData<T extends TableNames>(data: any[]): TableSchema<T>[] {
    const ids = Array(data.length).fill(this.utils.genId);
    const result = zipWith((id, data) => ({ id, ...data }), ids, data);
    return result;
  }
  private save(tableName: TableNames, rows) {
    const filePath = this.tableFilePath[tableName];
    this.fs.writeFileSync(filePath, rows);
  }
  findAll(tableName: TableNames): TableSchema<TableNames>[] {
    const filePath = this.tableFilePath[tableName];
    const data = this.fs.readFileSync(filePath);
    return JSON.parse(data);
  }
  findById(
    tableName: TableNames,
    id: string,
  ): TableSchema<TableNames> | undefined {
    const rows = this.findAll(tableName);
    return rows.find(row => row.id === id);
  }
  create(tableName: TableNames, data: CreateOrUpdateInput<TableNames>[]) {
    const existsRows = this.findAll(tableName);
    const newRows = this.setIdWithData(data);
    const rows = existsRows.concat(newRows);
    this.save(tableName, rows);
  }
  updateById(
    tableName: TableNames,
    id: string,
    data: CreateOrUpdateInput<TableNames>,
  ) {
    const row = this.findById(tableName, id);
    if (!row) return;
    this.deleteById(tableName, id);
    const newRow = { id: row.id, ...data };
    this.create(tableName, [newRow]);
  }
  deleteById(tableName: TableNames, id: string): void {
    const rows = this.findAll(tableName);
    const newData = rows.filter(row => row.id !== id);
    this.save(tableName, newData);
  }
}
