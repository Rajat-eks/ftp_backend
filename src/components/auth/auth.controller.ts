import { Body, Controller, Post,Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SIGNINDTO } from './dto/create-user.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() signInDto:SIGNINDTO)  {
    return this.authService.signIn(signInDto);
  }

  @Post('/password/reset_request')
  forgotPassword(@Body() bodyData:any): any {
    return this.authService.forgotPassword(bodyData);
    
  }

  @Post('/password/reset/:userId/:token')
  resetPassword(@Body() bodyData:any, @Param() paramData:any): any {
    return this.authService.resetPassword(paramData,bodyData);
    
  }
} 
