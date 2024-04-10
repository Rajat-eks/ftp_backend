import { Controller, Get ,Param} from '@nestjs/common';
import { DiscussionService } from './discussion.service';

@Controller('/discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Get('/:projectId')
  getDiscussion(@Param() projectId:any): any {
    return this.discussionService.getDiscussion(projectId);
  }
}
