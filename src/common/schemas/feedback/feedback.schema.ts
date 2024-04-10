import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeedbackDocument = feedbackSchema & Document;

@Schema({
  timestamps: true,
  collection: 'Feedbacks',
})
export class feedbackSchema {
  @Prop()
  feedback: string;
  @Prop()
  projectId: string;
  @Prop()
  userId: string;
}
export const FeedbackModelSchema = SchemaFactory.createForClass(feedbackSchema);
export const FEEDBACK_MODEL = feedbackSchema.name;
