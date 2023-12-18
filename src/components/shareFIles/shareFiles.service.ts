import { BadRequestException, Injectable } from '@nestjs/common';
import { ShareFileDTO } from './dto/shareFile.dto';
import { sendEmail } from 'src/utils/sendMail';
import { InjectModel } from '@nestjs/mongoose';
import {
  SHAREFILE_MODEL,
  ShareFileDocument,
} from 'src/Schema/shareFile/shareFile.schema';
import { Model } from 'mongoose';
import { CryptoService } from './crypto.service';
import { FOLDER_MODEL, FolderDocument } from 'src/Schema/folder/folder.schema';

@Injectable()
export class ShareFileService {
  constructor(
    @InjectModel(SHAREFILE_MODEL)
    private readonly shareFileModel: Model<ShareFileDocument>,
    @InjectModel(FOLDER_MODEL)
    private readonly folderModel: Model<FolderDocument>,
    private readonly cryptoService: CryptoService,
  ) {}

  async shareFile(shareFileDTO: ShareFileDTO): Promise<{ message: string }> {
    const { client, email, filePATH, folderID, msg, subject, userEmail } =
      shareFileDTO;
    console.log(shareFileDTO);
    let { _id, ...data } = await this.shareFileModel.create({
      folderID,
      filePATH,
      shareBy: userEmail,
      shareTo: email,
    });

    const id = _id.toString();
    const encryptedText = this.cryptoService.encrypt(id);

    let htmlMessage = `<p>Hello User,</p>

    <p>You have received some files from ${userEmail}. To access the files, please click the link below:</p>
  
    <p><a href=http://localhost:3000/viewfiles?token=${encryptedText}>Get Files</a></p>
  
    <p>Thank you!</p>`;

    let res = await sendEmail(email, subject, htmlMessage);

    return { message: 'File Share Sucessfully' };
  }

  async verifyFile(token: string): Promise<any> {
    try {
      const decryptedText = await this.cryptoService.decrypt(token);
      if (!decryptedText) {
        return {
          status: false,
        };
      }
      let targetFolder = await this.shareFileModel.findById(decryptedText);

      if (!targetFolder) {
        return {
          status: false,
        };
      }
      let folder = await this.folderModel.findById(targetFolder?.folderID);
      console.log(folder);
      if (targetFolder?.filePATH !== '0') {
        let files = folder?.files.filter((item) => item?.filePath == targetFolder?.filePATH);
        return {
          files: files,
          folder: folder,
          status: true,
          shareItem:'FILE'
        };
      }

      return {
        folder: folder,
        shareItem: 'FOLDER',
        status: true,
      };
    } catch (err) {
      return {
        status: false,
      };
      return err;
    }
  }
}
