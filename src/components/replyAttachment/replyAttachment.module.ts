import { Module } from '@nestjs/common';
import { ReplyAttachmentController } from './replyAttachment.controller';
import { ReplyAttachmentService } from './replyAttachment.service';

@Module({
  controllers: [ReplyAttachmentController],
  providers: [ReplyAttachmentService],
})
export class ReplyAttachmentModule {}
