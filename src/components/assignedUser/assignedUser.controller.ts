import { Controller, Get,Post ,Body,Param,Put} from '@nestjs/common';
import { AssignedUserService } from './assignedUser.service';

@Controller('/assigned')
export class AssignedUserController {
  constructor(private readonly assignedUserService: AssignedUserService) {}

  @Post('/createUser')
  createAssignedUser(@Body() bodyData:any): any {
    return this.assignedUserService.createAssignedUser(bodyData);
  }

  @Get('/getUser')
  getAssignedUser(): any {
    return this.assignedUserService.getAssignedUser();
  }

  @Get('/getUserById/:id')
  assignedUserGetById(@Param() id:any): any {
    return this.assignedUserService.assignedUserGetById(id);
  }

  @Put('/deleteUser/:id/:userId')
  removeAssignedUser(@Param() paramData:any): any {
    return this.assignedUserService.removeAssignedUser(paramData);
  }

  @Post('/updateUser/:id/')
  updateAssignedUser(@Param() paramData:any,@Body() bodyData:any): any {
    return this.assignedUserService.updateAssignedUser(paramData,bodyData);
  }
}
