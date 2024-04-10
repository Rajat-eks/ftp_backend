import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReplieDocument = Replies & Document;

@Schema({
  timestamps: true,
  collection: 'Replies',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Replies {
  @Prop({ unique: true })
  replieId: string;

  @Prop()
  projectId: string;

  @Prop()
  commentId: string;

  @Prop()
  replie: string;

  @Prop()
  time: string;

  @Prop()
  userName: string;

  @Prop()
  userRole: string;

  // Virtual population for comment attachments
  @Prop({
    ref: 'ReplieAttachments',
    foreignField: 'replieId',
    localField: 'replieId',
  })
  attachments: any[];
}
export const ReplieSchema = SchemaFactory.createForClass(Replies);
export const REPLIE_MODEL = Replies.name;
