import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  COMMENT_MODEL,
  CommentDocument,
} from 'src/common/schemas/comment/comment.schema';
import {
  COMMENTATTACHMENT_MODEL,
  CommentAttachmentDocument,
} from 'src/common/schemas/commentAttachment/commentAttachment.schema';
import {
  ATTACHMENT_MODEL,
  AttachmentDocument,
} from 'src/common/schemas/file/attachment.schema';
import {
  REPLIE_MODEL,
  ReplieDocument,
} from 'src/common/schemas/replie/replie.schema';
import {
  REPLYATTACHMENT_MODEL,
  ReplyAttachmentDocument,
} from 'src/common/schemas/replyAttachment/replyAttachment.schema';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectModel(COMMENT_MODEL)
    private readonly CommentsModel: Model<CommentDocument>,
    @InjectModel(COMMENTATTACHMENT_MODEL)
    private readonly CommentAttachmentsModel: Model<CommentAttachmentDocument>,
    @InjectModel(ATTACHMENT_MODEL)
    private readonly AttachmentModel: Model<AttachmentDocument>,
    @InjectModel(REPLIE_MODEL)
    private readonly ReplieModel: Model<ReplieDocument>,
    @InjectModel(REPLYATTACHMENT_MODEL)
    private readonly ReplieAttachmentModel: Model<ReplyAttachmentDocument>,
  ) {}
  async getDiscussion(projectId: any) {
    try {
      let modifiedData: any[] = [];
      const data = await this.CommentsModel.find({
        projectId: projectId.projectId,
      }).sort({ time: 'desc' });
      // .populate({
      //   path: 'replies',
      //   //deep population for replie attachments
      //   populate: {
      //     path: 'attachments',
      //   },
      // })
      // .populate({
      //   //populating comment attachments
      //   path: 'attachments',
      // });

      let commentAttachment = await this.CommentAttachmentsModel.find({
        projectId: projectId.projectId,
      }).sort({ time: 'desc' });

      let attachment = await this.AttachmentModel.find({
        projectId: projectId.projectId,
      }).sort({ time: 'desc' });

      let replie = await this.ReplieModel.find({
        projectId: projectId.projectId,
      }).sort({ time: 'asc' });

      let replieAttachment = await this.ReplieAttachmentModel.find({
        projectId: projectId.projectId,
      }).sort({ time: 'asc' });

      //Modified array
      for (let i = 0; i < data?.length; i++) {
        for (let j = 0; j < replie?.length; j++) {
          if (data[i]?.commentId == replie[j]?.commentId) {
            data[i]?.replies.push(replie[j]);
            for (let l = 0; l < replieAttachment?.length; l++) {
              if (replie[j]?.replieId == replieAttachment[l]?.replieId) {
                data[i]?.replies[j]?.attachments.push(replieAttachment[l]);
              } else {
                continue;
              }
            }
          } else {
            continue;
          }
        }
        for (let k = 0; k < commentAttachment?.length; k++) {
          if (data[i]?.commentId == commentAttachment[k]?.commentId) {
            data[i]?.attachments.push(commentAttachment[k]);
          } else {
            continue;
          }
        }
      }

      return data;
    } catch (e) {
      console.log(e);
      return 'Error - ' + e;
    }
  }
}
