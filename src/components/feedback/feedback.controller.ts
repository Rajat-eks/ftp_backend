import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/')
  createFeedback(@Body() bodyData: any): any {
    return this.feedbackService.createFeedback(bodyData);
  }

  @Get('/:projectid')
  getFeedback(@Param() projectid: any): any {
    return this.feedbackService.getFeedback(projectid);
  }
}
