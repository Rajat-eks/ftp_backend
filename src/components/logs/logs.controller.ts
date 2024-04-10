import { Body, Controller, Get, Param } from '@nestjs/common';
import { LogsService } from './logs.service';

@Controller('log')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('getAll')
  getAllLogs() {
    return this.logsService.getAllLogs();
  }

  @Get('find/:id')
  findLog(@Param('id') id: string) {
    return this.logsService.findLog(id);
  }
}
