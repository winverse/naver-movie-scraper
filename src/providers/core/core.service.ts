import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@providers/config';
import { FsService } from '@providers/fs/fs.service';
import fs from 'fs';

@Injectable()
export class CoreService implements OnModuleInit {
  constructor(
    private readonly fs: FsService,
    private readonly config: ConfigService,
  ) {}
  onModuleInit() {
    this.checkDatabaseDir();
    this.checkExistsTableJSONFile();
  }
  private checkDatabaseDir() {
    const dbName = this.config.get('database.dbHome');
    const databasePath = this.fs.getFilePathWithCwd(`${dbName}`);
    if (!this.fs.existsSync(databasePath)) {
      fs.mkdirSync(databasePath);
    }
  }
  private checkExistsTableJSONFile() {
    const dbName = this.config.get('database.dbHome');
    const tableNames = this.config.get('database.tables');
    tableNames
      .map(tableName =>
        this.fs.getFilePathWithCwd(`${dbName}/${tableName}.json`),
      )
      .filter(filePath => !this.fs.existsSync(filePath))
      .forEach(filePath => this.fs.writeFileSync(filePath, []));
  }
}
