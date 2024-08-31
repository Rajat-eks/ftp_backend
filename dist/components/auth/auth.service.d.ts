/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { SignupUserDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/sign-in.dto';
import { UserDocument } from 'src/Schema/auth/auth.schema';
import { Model } from 'mongoose';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { Request } from 'express';
import { LogsDocument } from 'src/Schema/log/log.schema';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    private readonly logsModel;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, logsModel: Model<LogsDocument>);
    findAccount(signInUserDto: SignInUserDto, ip: Request): Promise<{
        email: string;
        token: string;
        user: string;
        isAdmin: boolean;
        status: boolean;
    }>;
    createAccount(signupUserDto: SignupUserDto): Promise<{
        message: string;
    }>;
    changePassword(changePasswordDTO: ChangePasswordDTO): Promise<{
        message: string;
    }>;
    findAllUser(): Promise<any>;
    DeleteUser(id: any): Promise<any>;
    terminateAccount(id: any, bodyData: any): Promise<any>;
    forgotPassword(data: any): Promise<any>;
    getAllLogs(): Promise<any[]>;
    findLog(id: string): Promise<any>;
}
