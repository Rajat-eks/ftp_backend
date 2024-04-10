import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsStrongPassword,
    MinDate,
    MinLength,
  } from 'class-validator';
  
  export class SignInUserDto {
  
  
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
  
    @IsNotEmpty()
    readonly password: string;
  }
  