import { Controller, Get } from '@nestjs/common';
import { S3UploadService } from './s3Upload.service';

@Controller('s3/upload')
export class S3UploadController {
  constructor(private readonly s3UploadService: S3UploadService) {}

  @Get('/file')
  getHello(): any {
    return this.s3UploadService.getHello();
  }
}
