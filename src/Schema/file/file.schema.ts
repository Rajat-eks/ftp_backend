import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../auth/auth.schema';
import mongoose from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop()
  fileName: string;

  @Prop()
  filePath: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  user: User;
}

export const FileSchema = SchemaFactory.createForClass(File);
export const FILE_MODEL = File.name;
