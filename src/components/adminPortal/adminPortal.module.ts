import { Module } from '@nestjs/common';
import { AdminPortalController } from './adminPortal.controller';
import { AdminPortalService } from './adminPortal.service';


@Module({
  imports: [
   
  ],
  controllers: [AdminPortalController],
  providers: [AdminPortalService],
})
export class AdminPortalModule {}
