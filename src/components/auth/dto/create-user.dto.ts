import {isNotEmpty,IsString,} from 'class-validator'

export class SIGNINDTO{
   @IsString()
   email:string
   @IsString()
   password:string

}