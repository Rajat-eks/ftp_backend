import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Ip,
  Param,
  Patch,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/sign-up.dto';
import { SignInUserDto } from './dto/sign-in.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { Request } from 'express';

@Controller('/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  SignInAccount(
    @Body() signInUserDto: SignInUserDto,
    @Ip() ip: Request,
  ): Promise<{ token: string }> {
    return this.authService.findAccount(signInUserDto, ip);
  }

  @Post('/signUp')
  SignUpAccount(@Body() SignupUserDto: SignupUserDto): any {
    return this.authService.createAccount(SignupUserDto);
  }

  @Delete('/deleteUser/:id')
  DeleteUser(@Param('id') id: string): any {
    return this.authService.DeleteUser(id);
  }

  @Post('/changePassword')
  changePassword(@Body() changePasswordDTO: ChangePasswordDTO): any {
    return this.authService.changePassword(changePasswordDTO);
  }

  @Get('/findalluser')
  findAllUser(): any {
    return this.authService.findAllUser();
  }

  @Post('/forgotPassword')
  forgotPassword(@Body() data: any): any {
    return this.authService.forgotPassword(data);
  }

  @Patch('/terminateUser/:id')
  terminateAccount(@Param('id') id: string, @Body() bodyData: any): any {
    return this.authService.terminateAccount(id, bodyData);
  }

  @Get('/log/getAll')
  getAllLogs() {
    return this.authService.getAllLogs();
  }

  @Get('/log/find/:id')
  findLog(@Param('id') id: string) {
    return this.authService.findLog(id);
  }
}
