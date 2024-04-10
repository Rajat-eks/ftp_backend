import { Module } from '@nestjs/common';
import { ShareFileController } from './shareFiles.controller';
import { ShareFileService } from './shareFiles.service';
import { CryptoService } from './crypto.service';

@Module({
  imports: [],
  controllers: [ShareFileController],
  providers: [ShareFileService,CryptoService],
})
export class ShareFileModule {}
