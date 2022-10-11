import { Module } from '@nestjs/common';
import { ConfigModule } from '@providers/config';
import { FsModule } from '@providers/fs';
import { UtilsModule } from '@providers/utils';
import { DBService } from './db.service';

@Module({
  imports: [ConfigModule, UtilsModule, FsModule],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
