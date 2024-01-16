import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { SignupUserDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInUserDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL, UserDocument } from 'src/Schema/auth/auth.schema';
import { Model, Error } from 'mongoose';
import { ChangePasswordDTO } from './dto/changePassword.dto';
import { generateRandomPassword } from 'src/utils/generatePassword';
import { sendEmail } from 'src/utils/sendMail';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAccount(
    signInUserDto: SignInUserDto,
    ip: Request,
  ): Promise<{ email: string; token: string; user: string; isAdmin: boolean,status:boolean }> {
    try {
      const { email, password } = signInUserDto;
      console.log('Access by this IP', ip);

      const user = await this.userModel.findOne({ email: email });

      if (!user) {
        throw new NotFoundException('Invalid email');
      }

      const isPasswordMatched = await bcrypt.compare(password, user?.password);

      if (!isPasswordMatched) {
        throw new BadRequestException('Invalid password');
      }

      const token = this.jwtService.sign({ id: user?._id });

      return {
        email: user?.email,
        token,
        user: user?.name,
        isAdmin: user.isAdmin || false,
        status: user?.status ,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Email or Password');
    }
  }

  async createAccount(
    signupUserDto: SignupUserDto,
  ): Promise<{ message: string }> {
    try {
      const { email, name, password } = signupUserDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        isUser: true,
      });

      return {
        message: 'Account Created Sucessfully',
      };
    } catch (error) {
      if (
        error instanceof Error.ValidationError &&
        error.errors.email.kind === 'unique'
      ) {
        // Handle the unique constraint violation
        throw new ConflictException('Email address is already in use.');
      }
      // Handle other errors if needed
      throw error;
    }
  }

  async changePassword(
    changePasswordDTO: ChangePasswordDTO,
  ): Promise<{ message: string }> {
    try {
      const { email, password } = changePasswordDTO;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      let user = await this.userModel.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } },
      );
      return { message: 'Password Changed Sucessfully!' };
    } catch (err) {
      console.log(err);
    }
  }

  async findAllUser(): Promise<any> {
    try {
      let user = await this.userModel.find({ isUser: true });
      return { status: true, user: user };
    } catch (err) {
      console.log(err);
    }
  }

  async DeleteUser(id: any): Promise<any> {
    try {
      let user = await this.userModel.findByIdAndDelete(id);
      return { status: true, user: user };
    } catch (err) {
      console.log(err);
    }
  }

  async terminateAccount(id: any, bodyData: any): Promise<any> {
    try {
      let user = await this.userModel.findOneAndUpdate(
        { _id: id },
        { $set: bodyData },
        { returnDocument: 'after' },
      );
      return { status: true, user: user };
    } catch (err) {
      console.log(err);
    }
  }

  async forgotPassword(data: any): Promise<any> {
    try {
      const { email } = data;
      let user = await this.userModel.findOne({ email });

      if (!user) {
        return { status: false, message: 'User Not Found!' };
      }
      const randomPassword = await generateRandomPassword();
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(randomPassword, salt);
      await this.userModel.findOneAndUpdate(
        { email: email },
        { $set: { password: hashedPassword } },
      );
      await sendEmail(
        email,
        ' Password Forgot Sucessfully!',
        ` Your password for Secure FTP Server is: ${randomPassword}. Keep it secure!`,
      );
      await sendEmail(
        'satya.tyagi@effectualservices.com',
        `Password Forgot by ${email}`,
        `Email : ${email}
        Password: ${randomPassword}`,
      );
      return { status: true, message: 'Password Forgot Sucessfully' };
    } catch (err) {
      console.log(err);
    }
  }
}
