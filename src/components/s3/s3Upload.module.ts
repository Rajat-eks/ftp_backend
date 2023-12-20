import { Module } from '@nestjs/common';
import {  S3UploadController } from './s3Upload.controller';
import { S3UploadService } from './s3Upload.service';

@Module({
  imports: [],
  controllers: [S3UploadController],
  providers: [S3UploadService],
})
export class S3UploadModule {}
