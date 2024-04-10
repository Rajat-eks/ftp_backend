import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttachmentDocument = Attachments & Document;

@Schema({
  timestamps: true,
  collection: 'Attachments',
})
export class Attachments {
  @Prop()
  files: [];

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
export const AttachmentSchema = SchemaFactory.createForClass(Attachments);
export const ATTACHMENT_MODEL = Attachments.name;
