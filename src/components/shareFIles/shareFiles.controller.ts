import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShareFileService } from './shareFiles.service';
import { ShareFileDTO } from './dto/shareFile.dto';

@Controller('/share')
export class ShareFileController {
  constructor(private readonly shareFileService: ShareFileService) {}

  @Post('/files')
  shareFile(@Body() shareFileDTO: ShareFileDTO):any {
    return this.shareFileService.shareFile(shareFileDTO);
  }

  @Get('/verify/:token')
  verifyFile(@Param('token') token:string ):any {
    return this.shareFileService.verifyFile(token);
  }

  @Get('/verifyOTP/:token')
  verifyOTP(@Param('token') token:string ):any {
    return this.shareFileService.verifyOTP(token);
  }

  @Get('/isOTPSecurity/:token')
  checkOTPSecurity(@Param('token') token:string ):any {
    return this.shareFileService.checkOTPSecurity(token);
  }
}
