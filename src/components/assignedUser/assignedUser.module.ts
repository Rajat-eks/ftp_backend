import { Module } from '@nestjs/common';
import { AssignedUserController } from './assignedUser.controller';
import { AssignedUserService } from './assignedUser.service';

@Module({
  imports: [],
  controllers: [AssignedUserController],
  providers: [AssignedUserService],
})
export class AssignedUserModule {}
