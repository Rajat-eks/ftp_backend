import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/sign-up.dto';
import { SignInUserDto } from './dto/sign-in.dto';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    SignInAccount(signInUserDto: SignInUserDto, ip: Request): Promise<{
        token: string;
    }>;
    SignUpAccount(SignupUserDto: SignupUserDto): any;
    DeleteUser(id: string): any;
    changePassword(changePasswordDTO: ChangePasswordDTO): any;
    findAllUser(): any;
    forgotPassword(data: any): any;
    terminateAccount(id: string, bodyData: any): any;
    getAllLogs(): Promise<any[]>;
    findLog(id: string): Promise<any>;
}
