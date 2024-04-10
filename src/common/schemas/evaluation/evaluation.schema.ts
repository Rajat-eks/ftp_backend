import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EvaluationDocument = Evaluations & Document;

@Schema({
  timestamps: true,
  collection: 'Evaluations',
})
export class Evaluations {
  @Prop()
  projectId: string;

  @Prop()
  modification: string;

  @Prop()
  searchscore: number;

  @Prop()
  claimscore: number;

  @Prop()
  historyscore: number;

  @Prop()
  datacoverage: number;

  @Prop()
  sum: number;

  @Prop()
  category: string;

  @Prop()
  comment: string;

  @Prop()
  appSerachResult: string;
  @Prop()
  editedby: string;
}
export const EvaluationModelSchema = SchemaFactory.createForClass(Evaluations);
export const EVALUATION_MODEL = Evaluations.name;
