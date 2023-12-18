import { IsEmpty, IsNotEmpty } from 'class-validator';
import { User } from 'src/Schema/auth/auth.schema';

export class CreateFileDTO {
  @IsNotEmpty()
  readonly fileName: string;

  @IsNotEmpty()
  readonly filePath: string;

  @IsNotEmpty()
  readonly fileSize: any;

  @IsNotEmpty()
  readonly currenFolderID: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
