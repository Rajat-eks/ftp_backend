import { IsNotEmpty, IsOptional } from 'class-validator';

export class ShareFileDTO {
  @IsNotEmpty()
  readonly email: string[];

  readonly client: string;

 
  readonly subject: string;

  readonly msg: string;

  @IsNotEmpty()
  readonly folderID: string;

  @IsNotEmpty()
  readonly userEmail: string;
  
  readonly filePATH: string;
}
