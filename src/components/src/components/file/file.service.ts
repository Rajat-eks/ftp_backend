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
      `  <h3>Hi,</h3>
 <br>
 File uploaded by: ${userEmail}<br>
 <div style="max-height: 350px; overflow: auto;">
   <table style="width: 100%; border: 2px solid #000; border-radius: 5px;">
     <thead style="border-bottom: 2px solid #000;">
       <tr>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px; text-align: left; border-right: 2px solid #000;">
           S.N.
         </th>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px 20px; text-align: left; border-right: 2px solid #000;">
           File Name
         </th>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px; text-align: left; border-right: 2px solid #000;">
           File Size
         </th>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px 10px; text-align: left; border-right: 2px solid #000;">
           Date
         </th>
       </tr>
     </thead>
     <tbody>
       ${files
         .map(
           (item, id) => `
         <tr style="background-color: #fff; border-bottom: 1px solid #000; transition: background-color 0.3s ease-in-out;">
           <td style="padding: 6px 4px; white-space: nowrap; font-size: 14px; font-weight: medium; color: #000; border-right: 2px solid #000;">
             ${id + 1}
           </td>
           <td style="font-size: 14px; color: #007bff; font-weight: 500; padding: 6px 6px; white-space: nowrap; border-right: 2px solid #000; cursor: pointer;">
             <a href="${
               item.filePath
             }" style="text-decoration: none; color: #007bff;">${
               item.fileName
             }</a>
           </td>
           <td style="font-size: 14px; color: #000; font-weight: 500; padding: 6px 6px; white-space: nowrap; border-right: 2px solid #000;">
             ${item.fileSize}
           </td>
           <td style="font-size: 14px; color: #000; font-weight: 500; padding: 6px 6px; white-space: nowrap; border-right: 2px solid #000;">
             ${moment(item.dateAndTime).format('YYYY-MM-DD hh:mm a')}
           </td>
         </tr>
       `,
         )
         .join('')}
     </tbody>
   </table>
 </div>`,
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
    bodyData: any,
  ): Promise<{ message: string; files: any }> {
    const { folderID, files } = bodyData;

    let folder = await this.folderModel.findById(folderID);

    let updatedFile = (folder?.files || []).filter(
      (item:any): any =>
        !files.some(
          (file:any) =>
            file.fileName === item.fileName && file.fileSize === item.fileSize,
        ),
    );

    let { folderName, nextFolderID, prevFolderID, createdBy } = folder;

    await this.folderModel.findOneAndUpdate(
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
