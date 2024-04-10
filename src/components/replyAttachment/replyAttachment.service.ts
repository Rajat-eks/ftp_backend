import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as AWS from 'aws-sdk';
import { Model } from 'mongoose';
import {
  REPLYATTACHMENT_MODEL,
  ReplyAttachmentDocument,
} from 'src/common/schemas/replyAttachment/replyAttachment.schema';
import { format } from 'date-fns';
import * as moment from 'moment';

@Injectable()
export class ReplyAttachmentService {
  constructor(
    @InjectModel(REPLYATTACHMENT_MODEL)
    private readonly replyAttachmentModel: Model<ReplyAttachmentDocument>,
  ) {}
  async createFile(data: any) {
    try {
      const s3 = new AWS.S3({
        accessKeyId: 'AKIAZXDCNFFDKYAG4RDS',
        secretAccessKey: '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',
        region: 'us-east-2',
      });

      const params = {
        Bucket: 'huawei-portal-v1',
        Key: data.filename,
        Body: data.file,
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

  async saveFile(data: any) {
    try {
      const now =  moment();
      let add =await  this.replyAttachmentModel.create({
        ...data,
        createdAt: now.format('YYYY-MM-DD hh:mm:ss a'),
      });
      let result = await add.save();
      return { result, status: 'success' };
    } catch (error) {
      return { error, status: 'failed' };
    }
  }

  async getFiles(id: any) {
    try {
        const data = await this.replyAttachmentModel.find({ commentId: id });
        return(data);
      } catch (error) {
        return(error);
      }
  }
}
