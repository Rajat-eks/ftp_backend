import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentAttachmentDocument = commentAttachment & Document;

@Schema({
  timestamps: true,
  collection: 'CommentAttachments',
})
export class commentAttachment {
  @Prop()
  projectId: string;

  @Prop()
  commentId: string;

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
export const CommentAttachmentSchema =
  SchemaFactory.createForClass(commentAttachment);
export const COMMENTATTACHMENT_MODEL = commentAttachment.name;
