import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReplyAttachmentService } from './replyAttachment.service';

@Controller('/replyFiles')
export class ReplyAttachmentController {
  constructor(
    private readonly replyAttachmentService: ReplyAttachmentService,
  ) {}

  @Post('/')
  createFile(@Body() data: any): any {
    return this.replyAttachmentService.createFile(data);
  }

  @Post('/saveToDb')
  saveFile(@Body() data: any): any {
    return this.replyAttachmentService.saveFile(data);
  }

  @Get('/getFiles/:id')
  getFiles(@Param() id: any): any {
    return this.replyAttachmentService.getFiles(id);
  }
}
