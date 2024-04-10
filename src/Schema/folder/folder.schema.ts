import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../auth/auth.schema';
import mongoose from 'mongoose';

export type FolderDocument = Folder & Document;

@Schema({ timestamps: true })
export class Folder {
  @Prop()
  folderName: string;

  @Prop()
  nextFolderID: string;

  @Prop()
  prevFolderID: string;
  
  @Prop()
  createdBy: string;

  @Prop()
  files: [{ fileName: string; filePath: string ,fileSize:string,dateAndTime:any}];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
export const FOLDER_MODEL = Folder.name;
