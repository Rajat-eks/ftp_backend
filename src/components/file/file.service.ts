import { Injectable } from '@nestjs/common';
import { CreateFileDTO } from './dto/createFile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FILE_MODEL, FileDocument } from 'src/Schema/file/file.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/Schema/auth/auth.schema';
import { FOLDER_MODEL, FolderDocument } from 'src/Schema/folder/folder.schema';
import * as moment from 'moment';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FOLDER_MODEL)
    private readonly folderModel: Model<FolderDocument>,
  ) {}
  async createFile(createFileDTO: CreateFileDTO): Promise<{ message: string }> {
    const { currenFolderID, fileName, filePath, fileSize } = createFileDTO;
    let folder = await this.folderModel.findById(currenFolderID);

    let dateAndTime = moment();
    folder?.files?.push({ fileName, filePath, fileSize, dateAndTime });

    let { _id, ...updatedData } = folder;

    const updatedFiles = await this.folderModel
      .findByIdAndUpdate(folder?._id, updatedData)
      .exec();

    console.log(updatedFiles);
    return { message: 'Upload File Sucessfully!' };
  }

  async getAllFilesFromFolder(folderID: any): Promise<{ files: [any] }> {
    try{
      let folder = await this.folderModel.findById(folderID);

      return { files: folder?.files };
    }catch(err){
      console.log(err);
    }
    
  }

  async deleteFileFromFiles(
    queryData: any,
  ): Promise<{ message: string; files: any }> {
    const { folderID, filePath } = queryData;
    let folder = await this.folderModel.findById(folderID);
    let updatedFile = folder.files?.filter(
      (item) => item?.filePath !== filePath,
    );
    let updateResult = await this.folderModel.findOneAndUpdate(
      { _id: folderID },
      { $set: { ...folder, files: updatedFile } },
      { returnDocument: 'after' }, // return the updated document
    );

    return { message: 'File Delete Sucessfully', files: updatedFile };
  }
}
