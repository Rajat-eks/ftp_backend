import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  isAdmin: boolean;

  @Prop()
  isUser: boolean;

  @Prop({ default: true })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const USER_MODEL = User.name;
