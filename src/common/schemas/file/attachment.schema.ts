import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '../../constants';
import { Document } from 'mongoose';

export type AttachmentDocument = Attachment & Document;

@Schema({
  timestamps: true,
  collection: 'Attachments',
})
export class Attachment {
  @Prop()
  files: [{}];

  @Prop()
  projectId: string;

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
  uploadedBy: string;

  @Prop()
  createdAt: string;
}
export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
export const ATTACHMENT_MODEL = Attachment.name;
