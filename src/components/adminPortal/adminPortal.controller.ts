import { Controller, Get } from '@nestjs/common';
import { AdminPortalService } from './adminPortal.service';

@Controller('/log')
export class AdminPortalController {
  constructor(private readonly adminPortalService: AdminPortalService) {}

  @Get('/getAll')
  getLogs(): any {
    return this.adminPortalService.getLogs();
  }
}
