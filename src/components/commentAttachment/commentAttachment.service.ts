import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as AWS from 'aws-sdk';
import { Model } from 'mongoose';
import { format } from 'date-fns';
import * as moment from 'moment';
import {
  COMMENTATTACHMENT_MODEL,
  CommentAttachmentDocument,
} from 'src/common/schemas/commentAttachment/commentAttachment.schema';
import {
  ATTACHMENT_MODEL,
  AttachmentDocument,
} from 'src/common/schemas/file/attachment.schema';
import {
  REPLYATTACHMENT_MODEL,
  ReplyAttachmentDocument,
} from 'src/common/schemas/replyAttachment/replyAttachment.schema';

@Injectable()
export class CommentAttachmentService {
  constructor(
    @InjectModel(COMMENTATTACHMENT_MODEL)
    private readonly commentAttachmentModel: Model<CommentAttachmentDocument>,
    @InjectModel(ATTACHMENT_MODEL)
    private readonly attachmentModel: Model<AttachmentDocument>,
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
        Bucket: 'eks-rms',
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
      const now = moment();
      let add = await this.commentAttachmentModel.create({
        ...data,
        createdAt: now.format('YYYY-MM-DD hh:mm:ss a'),
      });
      let result = await add.save();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getFilesOfClient(projectId: any) {
    try {
      const commentEffectualClient = await this.commentAttachmentModel.find({
        projectId: projectId.projectId,
        role: { $in: ['Patent Expert', 'Admin', 'Technical Expert'] },
      });
      const effectualClient = await this.attachmentModel.find({
        projectId: projectId.projectId,
        role: { $in: ['Patent Expert', 'Admin', 'Technical Expert'] },
      });
      const replyEffectualClient = await this.replyAttachmentModel.find({
        projectId: projectId.projectId,
        role: { $in: ['Patent Expert', 'Admin', 'Technical Expert'] },
      });
      const result = [].concat(
        commentEffectualClient,
        effectualClient,
        replyEffectualClient,
      );
      return { result };
    } catch (error) {
      return error;
    }
  }

  async getFilesOfEffectual(projectId: any) {
    try {
      const commentEffectualAdmin = await this.commentAttachmentModel.find({
        projectId: projectId?.projectId,
        role: { $in: ['Manager', 'Effectual Admin', 'Searcher'] },
      });
      const effectualAdmin = await this.attachmentModel.find({
        projectId: projectId?.projectId,
        role: { $in: ['Manager', 'Effectual Admin', 'Searcher'] },
      });
      const replyEffectualAdmin = await this.replyAttachmentModel.find({
        projectId: projectId?.projectId,
        role: { $in: ['Manager', 'Effectual Admin', 'Searcher'] },
      });
      const result = [].concat(
        commentEffectualAdmin,
        effectualAdmin,
        replyEffectualAdmin,
      );
      return { result };
    } catch (error) {
      return error;
    }
  }

  async getFiles(id: any) {
    try {
      const data = await this.commentAttachmentModel.find({
        projectId: id,
      });
      return data;
    } catch (error) {
      return error;
    }
  }

  async deleteClientFile(data: any) {
    try {
      if (await this.commentAttachmentModel.findOne({ _id: data.projectId })) {
        const resultCommentAttachment =
          await this.commentAttachmentModel.findOne({
            _id: data.projectId,
            role: {
              $in: ['Patent Expert', 'Admin', 'Technical Expert'],
            },
          });
        const res = await resultCommentAttachment?.files?.splice(
          data.fileId,
          1,
        );
        await resultCommentAttachment.save();

        return { msg: 'Delete File Sucessfully' };
      } else if (
        await this.replyAttachmentModel.findOne({
          _id: data.projectId,
          role: { $in: ['Patent Expert', 'Admin', 'Technical Expert'] },
        })
      ) {
        const replyAttachment = await this.replyAttachmentModel.findOne({
          _id: data.projectId,
          role: { $in: ['Patent Expert', 'Admin', 'Technical Expert'] },
        });
        const res = await replyAttachment?.files?.splice(data.fileId, 1);
        await replyAttachment.save();

        return { msg: 'Delete File Sucessfully' };
      } else if (await this.attachmentModel.findOne({ _id: data.projectId })) {
        const resultAttachment = await this.attachmentModel.findOne({
          _id: data.projectId,
          role: { $in: ['Patent Expert', 'Admin', 'Technical Expert'] },
        });
        const res = await resultAttachment?.files?.splice(data.fileId, 1);
        await resultAttachment.save();

        return { msg: 'Delete File Sucessfully' };
      }
    } catch (error) {
      return error;
    }
  }
  async deleteEffectualFile(data: any) {
    try {
      if (
        await this.commentAttachmentModel.findOne({
          _id: String(data.projectId),
        })
      ) {
        const resultCommentAttachment =
          await this.commentAttachmentModel.findOneAndDelete({
            _id: String(data.projectId),
          });

        await resultCommentAttachment.save();

        return { msg: 'Delete File Sucessfully' };
      } else if (
        await this.replyAttachmentModel.findOne({
          _id: String(data.projectId),
        })
      ) {
        const replyAttachment =
          await this.replyAttachmentModel.findOneAndDelete({
            _id: String(data.projectId),
          });
        await replyAttachment.save();

        return { msg: 'Delete File Sucessfully' };
      } else if (
        await this.attachmentModel.findOne({
          _id: String(data.projectId),
        })
      ) {
        const resultAttachment = await this.attachmentModel.findOneAndDelete({
          _id: String(data.projectId),
        });
        await resultAttachment.save();

        return { msg: 'Delete File Sucessfully' };
      }
    } catch (error) {
      return error;
    }
  }
}
