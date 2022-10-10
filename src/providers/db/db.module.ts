import { Module } from '@nestjs/common';
import { ConfigModule } from '@providers/config';

import { DBService } from './db.service';

@Module({
  imports: [ConfigModule],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
