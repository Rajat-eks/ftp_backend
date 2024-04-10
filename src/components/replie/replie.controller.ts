import { Controller, Get,Post,Body } from '@nestjs/common';
import { ReplieService } from './replie.service';

@Controller('/replie')
export class ReplieController {
  constructor(private readonly replieService: ReplieService) {}

  @Post('/')
  createReplie(@Body() bodyData:any): any {
    return this.replieService.createReplie(bodyData);
  }
}
