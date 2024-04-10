import { Controller, Post,Body } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/')
  createComment(@Body() bodyData:any): any {
    return this.commentService.createComment(bodyData);
  }
}
