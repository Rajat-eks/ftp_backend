import { IsNotEmpty } from 'class-validator';

export class CreateFolderDTO {
  @IsNotEmpty()
  readonly folderName: string;

  @IsNotEmpty()
  readonly nextFolderID: string;

  @IsNotEmpty()
  readonly prevFolderID: string;

  @IsNotEmpty()
  readonly createdBy: string;

  readonly files: [{ fileName: string; filePath: string }];
}
