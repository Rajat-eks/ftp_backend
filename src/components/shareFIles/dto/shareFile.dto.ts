import { IsNotEmpty, IsOptional } from 'class-validator';

export class ShareFileDTO {
  @IsNotEmpty()
  readonly email: string[];

  readonly client: string;

  readonly subject: string;

  readonly msg: string;

  readonly OTPSecurity: boolean;

  @IsNotEmpty()
  readonly folderID: string;

  @IsNotEmpty()
  readonly userEmail: string;

  @IsNotEmpty()
  readonly isFolderShare: boolean;

  @IsNotEmpty()
  readonly isFileShare: boolean;

  readonly file: any;
}
