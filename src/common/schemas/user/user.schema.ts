import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '../../constants';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  collection: 'Users',
})
export class User {
  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

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

  @Prop({ default: true })
  status: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
export const USER_MODEL = User.name;
