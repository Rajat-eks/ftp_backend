import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '../../constants';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({
  timestamps: true,
  collection: 'Projects',
})
export class Project {
  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  projectId: string;

  @Prop({ required: true })
  searchObject: string;

  @Prop({})
  TypeOfSearch: string;

  @Prop({})
  reqDelivery: string;

  @Prop({ default: 'Invalidity Search' })
  projectName: string;

  @Prop({})
  requesterName: string;

  @Prop({})
  deliveryDate: string;

  @Prop({})
  priorArtDate: string;

  @Prop({})
  emailContent: string;

  @Prop({})
  info: string;

  @Prop({})
  status: string;

  @Prop({ default: 'Amit Goel' })
  projectManager: string;

  @Prop({})
  requestedDate: string;

  @Prop({})
  patentNumber: string;

  @Prop({})
  createdById: string;

  @Prop({})
  createdBy: string;

  @Prop({})
  completedDate: string;

  @Prop({})
  jurisdiction: string;

  @Prop({})
  include: string;

  @Prop({})
  technicalField: string;

  @Prop({})
  standard: string;

  @Prop({})
  sso: string;

  @Prop({})
  usipr: string;

  @Prop({})
  impClaim: string;

  @Prop({})
  nonImpClaim: string;

  @Prop({})
  techId: string;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
export const PROJECT_MODEL = Project.name;
