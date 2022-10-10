import { Module } from '@nestjs/common';
import { ConfigModule } from '@providers/config';
import { UtilsModule } from '@providers/utils';

import { DBService } from './db.service';

@Module({
  imports: [ConfigModule, UtilsModule],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
