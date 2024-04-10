import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comments & Document;

@Schema({
  timestamps: true,
  collection: 'Comments',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Comments {
  @Prop({ unique: true })
  commentId: string;

  @Prop({ required: true })
  projectId: string;

  @Prop()
  comment: string;

  @Prop()
  time: string;

  @Prop()
  userName: string;

  @Prop()
  userRole: string;

  // Virtual population for replies
  @Prop({ ref: 'Replies', foreignField: 'commentId', localField: 'commentId' })
  replies: any[];

  // Virtual population for comment attachments
  @Prop({
    ref: 'CommentAttachments',
    foreignField: 'commentId',
    localField: 'commentId',
  })
  attachments: any[];
}
export const CommentSchema = SchemaFactory.createForClass(Comments);
export const COMMENT_MODEL = Comments.name;
