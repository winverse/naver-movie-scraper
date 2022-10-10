import { MovieMetaDataFromChart } from '@common/interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@providers/config';
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import { fileURLToPath } from 'url';

@Injectable()
export class DBService {
  constructor(private readonly config: ConfigService) {}
  async init() {
    const dirPath = this.config.get('database.dirPath');
    const databaseHome = path.resolve(process.cwd(), dirPath);
    console.log(databaseHome);
  }
  get db() {
    return this.init();
  }
  async saveTop10MovieMetaData(data: MovieMetaDataFromChart[]) {
    this.init();
    // console.log('data', data);
    console.log('Save!');
  }
}
