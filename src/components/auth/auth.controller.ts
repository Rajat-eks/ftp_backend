import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/sign-up.dto';
import { SignInUserDto } from './dto/sign-in.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';

@Controller('/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  SignInAccount(
    @Body() signInUserDto: SignInUserDto,
  ): Promise<{ token: string }> {
    return this.authService.findAccount(signInUserDto);
  }

  @Post('/signUp')
  SignUpAccount(@Body() SignupUserDto: SignupUserDto): any {
    return this.authService.createAccount(SignupUserDto);
  }

  @Post('/changePassword')
  changePassword(@Body() changePasswordDTO: ChangePasswordDTO): any {
    return this.authService.changePassword(changePasswordDTO);
  }

  @Get('/findalluser')
  findAllUser(): any {
    return this.authService.findAllUser();
  }
}
