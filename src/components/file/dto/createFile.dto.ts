import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/Schema/auth/auth.schema';

export class CreateFileDTO {
  readonly dateAndTime: any;

  @IsNotEmpty()
  readonly files: any[];

  @IsNotEmpty()
  readonly currenFolderID: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;

  @IsOptional()
  readonly userEmail: string;
}
