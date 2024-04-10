import { BadRequestException, Injectable } from '@nestjs/common';
import { ShareFileDTO } from './dto/shareFile.dto';
import { sendEmail, sendMultipleEmail } from 'src/utils/sendMail';
import { InjectModel } from '@nestjs/mongoose';
import {
  SHAREFILE_MODEL,
  ShareFileDocument,
} from 'src/Schema/shareFile/shareFile.schema';
import { Model } from 'mongoose';
import { CryptoService } from './crypto.service';
import { FOLDER_MODEL, FolderDocument } from 'src/Schema/folder/folder.schema';
import { generateOTP } from 'src/utils/generateOTP';
import { LOGS_MODEL, LogsDocument } from 'src/Schema/log/log.schema';

@Injectable()
export class ShareFileService {
  constructor(
    @InjectModel(SHAREFILE_MODEL)
    private readonly shareFileModel: Model<ShareFileDocument>,
    @InjectModel(FOLDER_MODEL)
    private readonly folderModel: Model<FolderDocument>,
    private readonly cryptoService: CryptoService,
    @InjectModel(LOGS_MODEL)
    private readonly logsModel: Model<LogsDocument>,
  ) {}

  async shareFile(
    shareFileDTO: ShareFileDTO,
    ipAddress: any,
  ): Promise<{ message: string }> {
    const {
      email,
      file,
      folderID,
      OTPSecurity,
      subject,
      userEmail,
      isFileShare,
      isFolderShare,
    } = shareFileDTO;

    const OTP = generateOTP();
    let { _id, ...data } = await this.shareFileModel.create({
      folderID,
      file,
      shareBy: userEmail,
      shareTo: email,
      OTPSecurity: OTPSecurity,
      isFolderShare,
      isFileShare,
      OTP,
    });

    const id = _id.toString();
    const encryptedText = this.cryptoService.encrypt(id);

    let htmlMessage = OTPSecurity
      ? `<p>Hi,</p>

    <p>You have received  files from ${userEmail}. To access the files, please click the link below:</p>
  
    <p><a href=http://effectual-services.in/authanticate?token=${encryptedText}>Get Files</a></p>

    <p>Your Secured OTP: ${OTP}</p>
  
    <p>Thank you!</p>`
      : `<p>Hi,</p>

    <p>You have received  files from ${userEmail}. To access the files, please click the link below:</p>
  
    <p><a href=http://effectual-services.in/authanticate?token=${encryptedText}>Get Files</a></p>

    <p>Thank you!</p>`;

    sendEmail(email, subject, htmlMessage);

    const { folderName, files } = await this.folderModel?.findOne({
      _id: folderID,
    });

    const logs = await this.logsModel.create({
      userEmail: userEmail,
      ip: ipAddress,
      files: isFileShare ? file : files,
      folder: folderName,
      senderEmail: email,
      isDomainSame: false,
      isFolderShare,
      isFileShare,
    });
    return { message: 'File Share Sucessfully' };
  }

  async verifyFile(token: string): Promise<any> {
    try {
      const decryptedText: any = await this.cryptoService.decrypt(token);
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

      if (targetFolder?.isFolderShare) {
        return {
          files: targetFolder?.file,
          folder: folder,
          status: true,
          isFolderShare: true,
          isFileShare: false,
        };
      }

      if (targetFolder?.isFileShare) {
        return {
          files: targetFolder?.file,
          folder: folder,
          status: true,
          isFolderShare: false,
          isFileShare: true,
        };
      }
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  async verifyOTP(token: string): Promise<any> {
    try {
      const decryptedText: any = await this.cryptoService.decrypt(token);
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

      //Email Sending Process
      const OTP = generateOTP();

      const { shareTo } = targetFolder;
      sendMultipleEmail(
        shareTo,
        'Verification Code',
        `Your Verification code is ${OTP}`,
      );

      return {
        status: true,
        OTP: OTP,
        email: targetFolder?.shareTo,
      };
    } catch (err) {
      return {
        status: false,
      };
    }
  }
  async checkOTPSecurity(token: string): Promise<any> {
    try {
      const decryptedText: any = await this.cryptoService.decrypt(token);
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

      return {
        status: true,
        OTPSecurity: targetFolder?.OTPSecurity,
      };
    } catch (err) {
      return {
        status: false,
      };
    }
  }

  async getOTP(token: string): Promise<any> {
    try {
      const decryptedText: any = await this.cryptoService.decrypt(token);
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

      return {
        status: true,
        OTP: targetFolder?.OTP,
      };
    } catch (err) {
      return {
        status: false,
      };
    }
  }
}
