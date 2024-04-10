import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '../../constants';
import { Document } from 'mongoose';

export type AssignedUserDocument = AssignedUser & Document;

@Schema({
  timestamps: true,
  collection: 'AssignedUsers',
})
export class AssignedUser {
  @Prop({ required: true })
  userId: any[];

  @Prop({ required: true })
  projectId: String;
}
export const AssignedUserScema = SchemaFactory.createForClass(AssignedUser);
export const ASSIGNEDUSER_MODEL = AssignedUser.name;
