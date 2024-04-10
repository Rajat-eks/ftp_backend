import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type TokenDocument = Tokens & Document;

@Schema({
  timestamps: true,
  collection: 'Tokens',
})
export class Tokens {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  userId: any;

  @Prop({ type: Date, default: Date.now, index: { expires: '1h' } })
  createdAt: Date;

  @Prop({ type: String, required: true })
  token: string;
}
export const TokenSchema = SchemaFactory.createForClass(Tokens);
export const TOKEN_MODEL = Tokens.name;
