import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../auth/auth.schema';
import mongoose from 'mongoose';

export type ShareFileDocument = ShareFile & Document;

@Schema({ timestamps: true })
export class ShareFile {
  @Prop()
  folderID: string;

  @Prop()
  filePATH: string = '0';

  @Prop()
  token: string;

  @Prop()
  shareBy: string;

  @Prop()
  shareTo: string[];
}

export const ShareFileSchema = SchemaFactory.createForClass(ShareFile);
export const SHAREFILE_MODEL = ShareFile.name;
