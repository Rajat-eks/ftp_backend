import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDraftsDocument = ProjectDrafts & Document;

@Schema({
  timestamps: true,
  collection: 'ProjectDrafts',
})
export class ProjectDrafts {
  @Prop({ required: true })
  searchObject: string;

  @Prop()
  type: string;

  @Prop()
  typeOfSearch: string;

  @Prop()
  reqDelivery: string;

  @Prop({ default: 'Invalidity Search' })
  projectName: string;

  @Prop()
  requesterName: string;

  @Prop()
  deliveryDate: string;

  @Prop()
  priorArtDate: string;

  @Prop()
  emailContent: string;

  @Prop()
  info: string;

  @Prop()
  status: string;

  @Prop({ default: 'Amit Goel' })
  projectManager: string;

  @Prop()
  requestedDate: string;

  @Prop()
  patentNumber: string;

  @Prop()
  createdById: string;

  @Prop()
  completedDate: string;

  @Prop()
  jurisdiction: string;

  @Prop()
  include: string;

  @Prop()
  technicalField: string;

  @Prop()
  standard: string;

  @Prop()
  sso: string;

  @Prop()
  usipr: string;

  @Prop()
  impClaim: string;

  @Prop()
  nonImpClaim: string;

  @Prop()
  createdBy: string;

  @Prop()
  techId: string;

  @Prop({ type: [{}] }) // Assuming files is an array of strings
  files: any[];

  @Prop({ type: [{ type: Object }] }) // Assuming assignedUsers is an array of objects
  assignedUsers: Record<string, any>[];
}
export const ProjectDraftsSchema = SchemaFactory.createForClass(ProjectDrafts);
export const PROJECTDRAFT_MODEL = ProjectDrafts.name;
