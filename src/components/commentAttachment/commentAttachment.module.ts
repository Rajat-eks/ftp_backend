import { Module } from '@nestjs/common';
import {commentAttachmentController  } from './commentAttachment.controller';
import { CommentAttachmentService } from './commentAttachment.service';


@Module({
  imports: [
    
   
    ],
  controllers: [commentAttachmentController],
  providers: [CommentAttachmentService],
})
export class CommentAttachmentModule {}
