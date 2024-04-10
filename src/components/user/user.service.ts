import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { sendEmail, sendMultipleEmail } from 'src/utils/sendEmail';
import * as bcrypt from 'bcrypt';
import { validateUser } from 'src/utils/ValidateUser.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(data: any) {
    try {
      const isExist = await this.userModel.findOne({ email: data.email });
      if (isExist) {
        return {
          error: 'user already exist',
          data: null,
          code: 400,
        };
      }

      const newUser = await this.userModel.create({
        password: data.password,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      });
      const salt = await bcrypt.genSalt();
      // const hashedPssword = await bcrypt.hash(newUser.password, salt);
      newUser.password = newUser.password;
      await newUser.save();
      const SendEmail = await sendEmail(
        newUser.email,
        'New user Created',
        `
        <p>Hello user</p>
        <p>Your account has been created. Please login.</p>
        <p> Email :- ${newUser.email}</p>
        <p> Password :- ${data.password}</p>
        <p>Thanks</p>
        <p>Effectual Team</p>
        `,
      );
      if (SendEmail) {
        console.log('a');
      }

      newUser.password = undefined;
      return {
        newUser,
        msg: 'User has been created successfully',
        status: 'success',
      };
    } catch (error) {
      return {
        error,
        msg: 'Sorry, user creation is failed ',
        status: 'failed',
      };
    }
  }

  async getUsers() {
    let item = await this.userModel.find();
    if (item.length > 0) {
      return item;
    } else {
      return { result: 'Data not found!' };
    }
  }

  async getEffectualUsers() {
    try {
      const users = await this.userModel.find({
        role: { $in: ['Effectual Admin', 'Manager', 'Searcher'] },
      });
      if (users.length > 0) return users;
      else return { msg: 'Not Users found', status: 'success' };
    } catch (error) {
      return { msg: 'Server Error, Something went wrong.', status: 'failed' };
    }
  }

  async getClientUsers() {
    try {
      const users = await this.userModel.find({
        role: { $in: ['Admin', 'Patent Expert', 'Technical Expert'] },
      });
      if (users.length > 0) return users;
      else return { msg: 'Not Users found', status: 'success' };
    } catch (error) {
      return { msg: 'Server Error, Something went wrong.', status: 'failed' };
    }
  }

  async getUserById(id: any) {
    try {
      const result = await this.userModel.findOne({ _id: id });
      if (result) {
        return result;
      } else {
        return { result: 'Data not found!' };
      }
    } catch (error) {
      return { msg: 'Server Error, Something went wrong.', status: 'failed' };
    }
  }

  async deleteUser(id: any) {
    try {
      await this.userModel.updateOne(
        { _id: id?.id },

        { $set: { status: false } },
      );
      return { msg: 'User has been removed successfully!', status: 'success' };
    } catch {
      return {
        msg: 'Sorry, We could not removed the user. Try Again!',
        status: 'failed',
      };
    }
  }

  async updateUser(id: any, bodyData: any) {
    try {
      console.log(bodyData);
      const data = validateUser(bodyData);
      // if (error)
      //   return ({ msg: error.details[0].message, status: "failed" });

      const _id = id.id;
      const option = { new: true };

      let result = await this.userModel.findByIdAndUpdate(
        _id,
        bodyData,
        option,
      );
      result.password = null;

      const a = await sendMultipleEmail(
        result.email,
        'Profile has been updated',
        `
          Hello User,
          <p>Your profile has been updated </p>
          <p>Thanks,</p>
          <p>Effectual Team</p>
        `,
      );

      return {
        result,
        msg: 'Profile updated successfully!',
        status: 'success',
      };
    } catch (error) {
      return {
        msg: 'Sorry, we could not update your profile!',
        status: 'failed',
      };
    }
  }

  async updateRole(id: any, bodyData: any) {
    const { name, email, role } = bodyData;
    console.log(bodyData);
    try {
      let result = await this.userModel.findOneAndUpdate(
        // req.params.id,
        // req.body.role
        { _id: id.id },
        {
          name: name,
          email: email,
          role: role,
        },
      );
      const a = await sendMultipleEmail(
        result?.email,
        'Your Profile  has been updated',
        `
          Hello User,
          <p>Your Profile  has been updated  to ${bodyData.role}</p>
          <p>Thanks,</p>
          <p>Effectual Team</p>
        `,
      );
      console.log(a, 'email in users roel chnage');

      return {
        result,
        msg: 'Role updated successfully!',
        status: 'success',
      };
    } catch (error) {
      return {
        msg: 'Sorry, we could not update your role!',
        status: 'failed',
      };
    }
  }

  async searchUser(key: any) {
    let result = await this.userModel.find(
      {
        $or: [{ name: { $regex: key.key, $options: 'i' } }],
      },
      { password: 0, status: 0 },
    );
    return result;
  }

  async contactUs(bodyData: any) {
    try {
      const message = `
      <h2>Dear user,</h2>
      <h4>${bodyData?.name} trying to contact you, with email: <a href="mailto:${bodyData?.email}">${bodyData?.email}</a></h4>
      <h4>Their message:</h4>
      <p>${bodyData?.message}</p>`;

      const result = await sendEmail(
        'info@effectualservices.in',
        bodyData?.subject,
        message,
      );
      if (result === true)
        return {
          msg: 'Email has been successully sent. Thank You.',
          status: 'success',
        };
      else
        return {
          msg: 'Sorry, Email has not sent. Try again after some time.',
          status: 'failed',
        };
    } catch (error) {
      return {
        msg: 'Something went wrong. Email has not sent.',
        status: 'failed',
      };
    }
  }
}
