import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as AWS from 'aws-sdk';
import { Model } from 'mongoose';
import {
  ATTACHMENT_MODEL,
  AttachmentDocument,
} from 'src/common/schemas/file/attachment.schema';
import {
  ASSIGNEDUSER_MODEL,
  AssignedUserDocument,
} from 'src/common/schemas/project/assignedUser.schema';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { sendMultipleEmail } from '../../utils/sendEmail';
import {
  PROJECT_MODEL,
  ProjectDocument,
} from 'src/common/schemas/project/project.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(ATTACHMENT_MODEL)
    private readonly AttachmentModel: Model<AttachmentDocument>,
    @InjectModel(ASSIGNEDUSER_MODEL)
    private readonly AssignedModel: Model<AssignedUserDocument>,
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(PROJECT_MODEL)
    private readonly ProjectModel: Model<ProjectDocument>,
  ) {}
  async createFile(fileData: any) {
    try {
      const s3 = new AWS.S3({
        accessKeyId: 'AKIAZXDCNFFDKYAG4RDS',
        secretAccessKey: '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',
        region: 'us-east-2',
      });

      const params = {
        Bucket: 'eks-rms',
        Key: fileData.filename,
        Body: fileData.file,
        // ACL: "*",
      };
      // const uniqueNumber = Math.floor(Date.now() * Math.random());
      // const uniqueFileName = `${uniqueNumber}_${req.body.filename}`;

      const uploadResponse = await s3.upload(params, function (err, data) {
        if (err) {
          console.log('Error uploading file:', err);
        } else {
          console.log(
            'File uploaded successfully File location:',
            data.Location,
          );

          let url = data.Location;
          //this below code will add a cloudinary flag=> fl_attachement for download the file instead of opening in web.

          return {
            url,
            msg: 'File has been uploaded successfully',
            status: 'success',
          };
        }
      });
    } catch (error) {
      return {
        error,
        code: 500,
        msg: 'Sorry, File uploadation. failed!',
        status: 'failed',
      };
    }
  }

  async saveFile(fileData: any) {
    try {
      const now = new Date();
      //       const now=  new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}),
      let add = await this.AttachmentModel.create({
        ...fileData,
        //       createdAt: date.format(now, "YYYY-MM-DD HH:mm:ss"),
        createdAt: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
        }),
      });
      let result = await add.save();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadReportAndSendEmails(fileData: any) {
    try {
      let add = await this.AttachmentModel.create({
        files: {
          label:fileData?.filename,
          path: fileData?.file,
        },
        role: fileData?.role,
        uploadedBy: fileData?.uploadedBy,
        projectId: fileData?.projectId,
      });
      await add.save();
      const assigned_user = await this.AssignedModel.findOne({
        projectId: fileData?.projectId,
      });

      let assg_userss = [];

      if (assigned_user) {
        for (let i = 0; i < assigned_user.userId.length; i++) {
          assg_userss.push(assigned_user?.userId[i]?.email);
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
      function removeDuplicates(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      }
      const newUser = removeDuplicates(all_users);

      const ab = await sendMultipleEmail(
        newUser,
        `Final Report In project ${fileData?.projectId}`,
        ` Hello User, <p> Final Report has been uploaded  for  ${fileData?.projectId}</p>
              <p>You can access the project here :- <a href="https://effepro.com" > Click Here<a/></p>
              <p> Thanks,</p>
              <p> Effectual Team</p>
              `,
      );

      return {
        //   url,
        msg: 'File has been uploaded successfully',
        status: 'success',
      };
    } catch (error) {
      return {
        error,
        code: 500,
        msg: 'Sorry, File uploadation. failed!',
        status: 'failed',
      };
    }
  }

  async getFiles(id: any) {
    try {
      const data = await this.AttachmentModel.findOne({ projectId: id?.id });
      return data;
    } catch (error) {
      return error;
    }
  }
  async updateStatus(fileData: any, id: any) {
    try {
      const result = await this.ProjectModel.findOneAndUpdate(
        { projectId: id?.id },
        {
          status: fileData.status,
        },
        {
          new: true,
        },
      );
      return {
        msg: 'Report status has been successfully updated!',
        status: 'success',
      };
    } catch (error) {
      return {
        error,
        msg: 'Sorry, report updation is failed!',
        status: 'failed',
      };
    }
  }
}
