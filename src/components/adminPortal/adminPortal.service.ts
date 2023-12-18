import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SHAREFILE_MODEL,
  ShareFileDocument,
} from 'src/Schema/shareFile/shareFile.schema';

@Injectable()
export class AdminPortalService {
  constructor(
    @InjectModel(SHAREFILE_MODEL)
    private readonly shareFileModel: Model<ShareFileDocument>,
  ) {}
  async getLogs(): Promise<{}> {
    let data = await this.shareFileModel.find();
    return {
      status: true,
      logs: data,
    };
  }
}
