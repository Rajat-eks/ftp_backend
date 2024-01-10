import { Injectable } from '@nestjs/common';
import { CreateFileDTO } from './dto/createFile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FILE_MODEL, FileDocument } from 'src/Schema/file/file.schema';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/Schema/auth/auth.schema';
import { FOLDER_MODEL, FolderDocument } from 'src/Schema/folder/folder.schema';
import * as moment from 'moment';
import { sendEmail } from 'src/utils/sendMail';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FOLDER_MODEL)
    private readonly folderModel: Model<FolderDocument>,
  ) {}

  async createFile(createFileDTO: CreateFileDTO): Promise<{ message: string }> {
    const { currenFolderID, files, userEmail } = createFileDTO;

    let folder = await this.folderModel.findById(currenFolderID);

    folder?.files?.push(...files);

    let { _id, ...updatedData } = folder;

    const updatedFiles = await this.folderModel
      .findByIdAndUpdate(folder?._id, updatedData)
      .exec();

    sendEmail(
      'satya.tyagi@effectualservices.com',
      `File Upload`,
      `
    <h4>Hi,</h4>
    <br>
  
    <p>
    File uploaded by: ${userEmail}<br>
    <br>
     Path: ${files[0]?.filePath}<br>
     <br>

     Size: ${files[0]?.fileSize}<br>
     <br>
     Date & Time: ${moment(files[0]?.dateAndTime).format('YYYY-MM-DD hh:mm a')}
    </p>
    `,
    );
    return { message: 'Upload File Sucessfully!' };
  }

  async getAllFilesFromFolder(folderID: any): Promise<{ files: [any] }> {
    try {
      let folder = await this.folderModel.findById(folderID);

      return { files: folder?.files };
    } catch (err) {
      console.log(err);
    }
  }

  async deleteFileFromFiles(
    queryData: any,
  ): Promise<{ message: string; files: any }> {
    const { folderID, fileName, fileSize } = queryData;

    let folder = await this.folderModel.findById(folderID);

    let updatedFile = folder.files?.filter((item) => {
      return item?.fileName !== fileName && item?.fileSize !== fileSize;
    });

    let { folderName, nextFolderID, prevFolderID, createdBy } = folder;

    let updateResult = await this.folderModel.findOneAndUpdate(
      { _id: folderID },
      {
        $set: {
          folderName,
          nextFolderID,
          prevFolderID,
          createdBy,
          files: updatedFile,
        },
      },
      { returnDocument: 'after' }, // return the updated document
    );

    return { message: 'File Delete Sucessfully', files: updatedFile };
  }
}
