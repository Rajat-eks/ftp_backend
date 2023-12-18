import { MongooseModule, Schema } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from './auth/auth.schema';
import { Global, Module } from '@nestjs/common';
import { FILE_MODEL, FileSchema } from './file/file.schema';
import { FOLDER_MODEL, FolderSchema } from './folder/folder.schema';
import { SHAREFILE_MODEL, ShareFileSchema } from './shareFile/shareFile.schema';

const MODELS = [
  { name: USER_MODEL, schema: UserSchema },

  { name: FILE_MODEL, schema: FileSchema },
  { name: FOLDER_MODEL, schema: FolderSchema },
  { name: SHAREFILE_MODEL, schema: ShareFileSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
