import { Injectable } from '@nestjs/common';

@Injectable()
export class S3UploadService {
  getHello(): string {
    return 'Hello World!';
  }
}
