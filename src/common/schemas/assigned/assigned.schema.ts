import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssignedDocument = AssignedUsers & Document;

@Schema({
  timestamps: true,
  collection: 'AssignedUsers',
})
export class AssignedUsers {
  @Prop({ required: true })
  userId: any[];

  @Prop({ required: true })
  projectId: string;
}
export const AssignedModelSchema = SchemaFactory.createForClass(AssignedUsers);
export const ASSIGNED_MODEL = AssignedUsers.name;
