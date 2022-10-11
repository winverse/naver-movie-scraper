import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@providers/config';
import { FsService } from '@providers/fs/fs.service';

@Injectable()
export class CoreService implements OnModuleInit {
  constructor(
    private readonly fs: FsService,
    private readonly config: ConfigService,
  ) {}
  onModuleInit() {
    this.checkExistsTableJSONFile();
  }
  private checkExistsTableJSONFile() {
    const dbName = this.config.get('database.name');
    const tableNames = this.config.get('database.tables');
    tableNames
      .map(tableName =>
        this.fs.getFilePathWithCwd(`${dbName}/${tableName}.json`),
      )
      .filter(filePath => !this.fs.existsSync(filePath))
      .forEach(filePath => this.fs.writeFileSync(filePath, '[]'));
  }
}
