import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ShareFileService } from './shareFiles.service';
import { ShareFileDTO } from './dto/shareFile.dto';
import { Request } from 'express';

@Controller('/share')
export class ShareFileController {
  constructor(private readonly shareFileService: ShareFileService) {}

  @Post('/files')
  shareFile(@Body() shareFileDTO: ShareFileDTO, @Req() request: Request): any {
    const ipAddress = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
    return this.shareFileService.shareFile(shareFileDTO, ipAddress);
  }

  @Get('/verify/:token')
  verifyFile(@Param('token') token: string): any {
    return this.shareFileService.verifyFile(token);
  }

  @Get('/verifyOTP/:token')
  verifyOTP(@Param('token') token: string): any {
    return this.shareFileService.verifyOTP(token);
  }

  @Get('/isOTPSecurity/:token')
  checkOTPSecurity(@Param('token') token: string): any {
    return this.shareFileService.checkOTPSecurity(token);
  }

  @Get('/getOTP/:token')
  getOTP(@Param('token') token: string): any {
    return this.shareFileService.getOTP(token);
  }
}
