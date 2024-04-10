import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '../../constants';
import { Document } from 'mongoose';

export type ReplyAttachmentDocument = ReplyAttachment & Document;

@Schema({
  timestamps: true,
  collection: 'ReplieAttachments',
})
export class ReplyAttachment {
  @Prop()
  projectId: string;

  @Prop()
  replieId: string;

  @Prop({
    enum: [
      'Manager',
      'Patent Expert',
      'Searcher',
      'Admin',
      'Effectual Admin',
      'Technical Expert',
    ],
  })
  role: string;
  @Prop()
  files: any[];

  @Prop()
  uploadedBy: string;

  @Prop()
  createdAt: string;
}
export const ReplyAttachmentSchema =
  SchemaFactory.createForClass(ReplyAttachment);
export const REPLYATTACHMENT_MODEL = ReplyAttachment.name;
