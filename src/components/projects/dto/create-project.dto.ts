import { isNotEmpty, IsString } from 'class-validator';

export class CREATEPROJECTDTO {
  @IsString()
  name: string;

  @IsString()
  projectId: string;

  @IsString()
  searchObject: string;

  @IsString()
  TypeOfSearch: string;

  @IsString()
  reqDelivery: string;

  @IsString()
  projectName: string;

  @IsString()
  requesterName: string;

  @IsString()
  deliveryDate: string;

  @IsString()
  priorArtDate: string;

  @IsString()
  emailContent: string;

  @IsString()
  info: string;

  @IsString()
  status: string;

  @IsString()
  projectManager: string;

  @IsString()
  requestedDate: string;

  @IsString()
  patentNumber: string;

  @IsString()
  createdById: string;

  @IsString()
  completedDate: string;

  @IsString()
  jurisdiction: string;

  @IsString()
  include: string;

  @IsString()
  technicalField: string;

  @IsString()
  standard: string;

  @IsString()
  sso: string;

  @IsString()
  usipr: string;

  @IsString()
  impClaim: string;

  @IsString()
  nonImpClaim: string;

  @IsString()
  createdBy: string;

  @IsString()
  techId: string;
}
