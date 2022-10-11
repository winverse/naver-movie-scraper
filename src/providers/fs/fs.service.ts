import fs from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FsService {
  getFilePathWithCwd(filePath: string): string {
    return path.resolve(process.cwd(), `${filePath}`);
  }
  readFileSync(filePath: string) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data || JSON.stringify([]);
  }
  writeFileSync(filePath: string, data: string) {
    if (!filePath) return;
    return fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
  }
  existsSync(filePath) {
    return fs.existsSync(filePath);
  }
}
