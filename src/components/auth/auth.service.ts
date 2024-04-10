import {
  Injectable,
  BadRequestException,
  ServiceUnavailableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { SIGNINDTO } from './dto/create-user.dto';
import { validateEmail } from 'src/utils/ValidateUser.utils';
import { sendMultipleEmail } from 'src/utils/sendEmail';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as randomString from 'randomstring';
import {
  TOKEN_MODEL,
  TokenDocument,
} from 'src/common/schemas/token/token.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    @InjectModel(TOKEN_MODEL) private readonly tokenModel: Model<TokenDocument>,
  ) {}

  async signIn(signInDto: SIGNINDTO) {
    try {
      const user = await this.userModel.findOne({ email: signInDto?.email });

      if (!user) return { msg: 'Invalid user email', status: 'failed' };

      // const comparePassword = await bcrypt.compare(
      //   signInDto?.password,
      //   user.password,
      // );

      const comparePassword = signInDto?.password === user.password;

      if (!comparePassword)
        return { error: 'Invalid Password', status: 'failed' };

      const token = await jwt.sign(
        { _id: user._id.toString() }, //payload
        process.env.SUPER_SECRET_KEY,
      );

      user.password = undefined;
      return {
        msg: 'You have logged in successfully!',
        user,
        token,
        status: 'success',
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async forgotPassword(bodyData: any) {
    try {
      // const error = validateEmail(bodyData);
      // if (error)
      //   return return({ mssg: error.msg, status: 'failed' });

      const user = await this.userModel.findOne({ email: bodyData?.email });
      if (!user)
        return {
          mssg: "User with given email doesn't exist!",
          status: 'failed',
        };

      //delete tokens if already existed for the requested user.
      // let token = await tokenModel.findOne({ userId: user._id });
      // if (token) await tokenModel.deleteMany();

      //generating a token and saving hash of it in db however passing plain resettoken in email
      let resetToken = randomString.generate({
        length: 10,
        charset: 'alphanumeric',
      });
      console.log(resetToken);
      const salt = await bcrypt.genSalt();
      console.log(salt);

      const userId = await this.userModel.findOne({ email: bodyData.email });
      console.log(userId);
      const work = await this.userModel.findByIdAndUpdate(userId._id, {
        $set: { password: resetToken },
      });

      const mssg = await sendMultipleEmail(
        userId.email,
        'New Password',
        `<p> Hello User </p>
         <p>  Your new password is ${resetToken} </p>
         <p> Thanks, </p>
         <p> Effectual Team</p>
         Click here to access the link :- <a href="https://effepro.com" > Click here </a>
         `,
      );

      if (mssg === true)
        return {
          mssg: 'Email Successfully Sent . Kindly check your email inbox or spam folder to reset your password!',
          status: 'success',
        };
      else
        return {
          mssg: 'Sorry, Email could not sent due to server error!',
          status: 'failed',
        };
    } catch (error) {
      return { mssg: 'Something went wrong.', status: 'failed' };
    }
  }

  async resetPassword(paramData: any, bodyData: any) {
    try {
      // return true if userId is valid mongoose objectId else false
      if (mongoose.isValidObjectId(paramData.userId)) {
        const passwordResetToken = await this.tokenModel.findOne({
          userId: paramData.userId,
        });
        if (!passwordResetToken)
          return {
            mssg: 'Invalid or expired password reset token',
            status: 'failed',
          };

        //comparing token we got with its hash in db.
        const isValid = await bcrypt.compare(
          paramData.token,
          passwordResetToken.token,
        );
        if (!isValid)
          return {
            mssg: 'Invalid or expired password reset token',
            status: 'failed',
          };

        const salt = await bcrypt.genSalt();
        const hashedPssword = await bcrypt.hash(bodyData.password, salt);

        await this.userModel.findByIdAndUpdate(paramData.userId, {
          $set: { password: hashedPssword },
        });
        await this.tokenModel.findOneAndDelete({ userId: paramData.userId });

        return {
          mssg: 'Password Reset Sucessfully.',
          status: 'success',
        };
      } else {
        return { mssg: 'Bad Request', status: 'failed' };
      }
    } catch (error) {
      console.log(error);
      return { mssg: 'Something went wrong.', status: 'failed' };
    }
  }
}
