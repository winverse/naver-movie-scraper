import { Module } from '@nestjs/common';
import { ConfigModule } from '@providers/config';
import { FsModule } from '@providers/fs/fs.module';
import { CoreService } from './core.service';

@Module({
  imports: [FsModule, ConfigModule],
  providers: [CoreService],
})
export class CoreModule {}
