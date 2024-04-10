import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FEEDBACK_MODEL,
  FeedbackDocument,
} from 'src/common/schemas/feedback/feedback.schema';
import {
  ASSIGNEDUSER_MODEL,
  AssignedUserDocument,
} from 'src/common/schemas/project/assignedUser.schema';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { sendMultipleEmail } from 'src/utils/sendEmail';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(ASSIGNEDUSER_MODEL)
    private readonly assignedModel: Model<AssignedUserDocument>,
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(FEEDBACK_MODEL)
    private readonly feedbackModel: Model<FeedbackDocument>,
  ) {}

  async createFeedback(bodyData: any) {
    try {
      const sendMail = async () => {
        try {
          const newUser = await this.assignedModel.findOne({
            projectId: bodyData.projectId,
          });

          let usersss = [];

          for (let i = 0; i < newUser?.userId?.length; i++) {
            usersss.push(newUser?.userId[i]?.email);
          }

          usersss = usersss.concat([
            // "amit.goel@effectualservices.com ",
            // "manoj.poonia@effectualservices.com",
            // "ritu.tyagi@effectualservices.com",
          ]);

          const users = await this.userModel.find({
            role: { $in: ['Admin'] },
          });

          for (let i = 0; i < users.length; i++) {
            usersss.push(users[i].email);
          }

          function removeDuplicates(arr) {
            return arr.filter((item, index) => arr.indexOf(item) === index);
          }
          const NewUser = removeDuplicates(usersss);
          const res1 = await sendMultipleEmail(
            NewUser,
            'New Feedback',
            `<p>Hello User,</p>
            <p>New Feedback  has been  created related to ${bodyData.projectId} project<h4/>
            <p> The feedback  is -${bodyData.feedback}</p>
            <p>You can access the project here :- <a href="https://effectualrms.com/" > Click Here<a/></p>`,
          );
        } catch (err) {
          console.log(err);
        }
      };

      let add = new this.feedbackModel(bodyData);
      let result = await add.save();
      await sendMail();
      if (result)
        return {
          msg: 'Feedback Sent Successfully!',
          status: 'success',
        };
      else
        return {
          msg: 'Sorry, Sending feedback is failed!',
          status: 'failed',
        };
    } catch {
      return {
        msg: 'Sorry, Sending feedback is failed!',
        status: 'failed',
      };
    }
  }

  async getFeedback(projectid: any) {
    try {
      const data = await this.feedbackModel.find({ projectId: projectid });
      return data;
    } catch (err) {
      return { msg: err, status: 'failed' };
    }
  }
}
