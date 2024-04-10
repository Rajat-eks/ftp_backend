import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type LogsDocument = Logs & Document;

@Schema({ timestamps: true })
export class Logs {
  @Prop()
  userEmail: string;

  @Prop()
  ip: string;

  @Prop({ type: [] })
  files: any[];

  @Prop()
  folder: string;

  @Prop()
  senderEmail: string[];

  @Prop()
  isDomainSame: boolean;

  @Prop()
  isFileShare: boolean;

  @Prop()
  isFolderShare: boolean;
}

export const LogsSchema = SchemaFactory.createForClass(Logs);
export const LOGS_MODEL = Logs.name;
