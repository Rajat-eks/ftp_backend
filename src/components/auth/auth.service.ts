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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findAccount(
    signInUserDto: SignInUserDto,
  ): Promise<{ email: string; token: string; user: string }> {
    try {
      const { email, password } = signInUserDto;

      const user = await this.userModel.findOne({ email: email });

      if (!user) {
        throw new NotFoundException('Invalid email');
      }

      const isPasswordMatched = await bcrypt.compare(password, user?.password);

      if (!isPasswordMatched) {
        throw new BadRequestException('Invalid password');
      }

      const token = this.jwtService.sign({ id: user?._id });

      return { email: user?.email, token, user: user?.name };
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
}
