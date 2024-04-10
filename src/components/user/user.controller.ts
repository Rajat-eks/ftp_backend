import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  createUser(@Body() data: any): any {
    return this.userService.createUser(data);
  }

  @Get('/')
  getUsers(): any {
    return this.userService.getUsers();
  }

  @Get('/getEffectulalUsers')
  getEffectualUsers(): any {
    return this.userService.getEffectualUsers();
  }

  @Get('/getClientUsers')
  getClientUsers(): any {
    return this.userService.getClientUsers();
  }

  @Get('/:id')
  getUserById(@Param() id: any): any {
    return this.userService.getUserById(id);
  }

  @Put('/delete/:id')
  deleteUser(@Param() id: any): any {
    return this.userService.deleteUser(id);
  }

  @Put('/update/:id')
  updateUser(@Param() id: any, @Body() bodyData: any): any {
    return this.userService.updateUser(id, bodyData);
  }

  @Put('/update-role/:id')
  updateRole(@Param() id: any, @Body() bodyData: any): any {
    return this.userService.updateRole(id, bodyData);
  }

  @Get('/search/:key')
  searchUser(@Param() key: any): any {
    return this.userService.searchUser(key);
  }

  //CONTACT US

  @Post('/contactUs')
  contactUs(@Body() bodyData: any): any {
    return this.userService.contactUs(bodyData);
  }
}
