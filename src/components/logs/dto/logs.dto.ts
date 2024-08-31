import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateLogDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly userEmail: string;

  readonly files: any[];

  readonly folder: string;

  readonly senderEmail: string[];

  readonly ip: string;
  readonly isFolderShare: boolean;
  readonly isFileShare: boolean;
}
