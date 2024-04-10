import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import ObjectID from 'bson-objectid';
import date from 'date-and-time';
import { Model } from 'mongoose';
import {
  ASSIGNEDUSER_MODEL,
  AssignedUserDocument,
} from 'src/common/schemas/project/assignedUser.schema';
import {
  REPLIE_MODEL,
  ReplieDocument,
} from 'src/common/schemas/replie/replie.schema';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { sendMultipleEmail } from 'src/utils/sendEmail';

@Injectable()
export class ReplieService {
  constructor(
    @InjectModel(REPLIE_MODEL)
    private readonly replieModel: Model<ReplieDocument>,
    @InjectModel(ASSIGNEDUSER_MODEL)
    private readonly assignedUsersModel: Model<AssignedUserDocument>,

    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
  ) {}
  async createReplie(bodyData: any) {
    const now = new Date();
    const data = new this.replieModel({
      replieId: ObjectID(),
      commentId: bodyData.commentId,
      projectId: bodyData.projectId,
      replie: bodyData.content,
      //         time : date.format(now, "YYYY-MM-DD HH:mm:ss"),
      time: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
      userName: bodyData.userName,
      userRole: bodyData.userRole,
    });

    try {
      const result = await data.save();
      const assigned_user = await this.assignedUsersModel.findOne({
        projectId: data.projectId,
      });
      let assg_userss = [];
      if (assigned_user) {
        for (let i = 0; i < assigned_user.userId.length; i++) {
          assg_userss.push(assigned_user.userId[i].email);
        }
      }
      const all_users = assg_userss.concat([
        // "amit.goel@effectualservices.com ",
        // "manoj.poonia@effectualservices.com",
        // "ritu.tyagi@effectualservices.com",
      ]);

      const users = await this.userModel.find({
        role: { $in: ['Admin'] },
      });

      for (let i = 0; i < users.length; i++) {
        all_users.push(users[i].email);
      }

      function removeDuplicates(arr: any) {
        return arr.filter(
          (item: any, index: any) => arr.indexOf(item) === index,
        );
      }
      const newUser = removeDuplicates(all_users);

      const ab = await sendMultipleEmail(
        newUser,
        `New Reply In project ${data.projectId}`,
        `Hello User, <p> New Reply has been added by  ${data.userName} </p>
            <p>
            <p> Thanks, </p>
            <p>Effectual Team</p>
            <p> Click here to access the link :- <a href="https://effepro.com" > Click here </a> </p>
            `,
      );

      return {
        ...result.toJSON(),
        msg: 'Reply has been posted successfully!',
        status: 'success',
      };
    } catch (error) {
      return { error, msg: 'Sorry, reply posting failed!', status: 'failed' };
    }
  }
}
