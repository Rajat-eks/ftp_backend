import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../auth/auth.schema';
import mongoose from 'mongoose';

export type ShareFileDocument = ShareFile & Document;

@Schema({ timestamps: true })
export class ShareFile {
  @Prop()
  folderID: string;

  @Prop({ type: {} })
  file: any;

  @Prop()
  token: string;

  @Prop()
  shareBy: string;

  @Prop()
  shareTo: string[];

  @Prop()
  isFolderShare: boolean;

  @Prop()
  isFileShare: boolean;

  @Prop()
  OTPSecurity: boolean;
  
  @Prop()
  OTP: string;
}

export const ShareFileSchema = SchemaFactory.createForClass(ShareFile);
export const SHAREFILE_MODEL = ShareFile.name;
