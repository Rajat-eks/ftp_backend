import { Module } from '@nestjs/common';
import { ReplieController } from './replie.controller';
import { ReplieService } from './replie.service';

@Module({
  imports: [],
  controllers: [ReplieController],
  providers: [ReplieService],
})
export class ReplieModule {}
