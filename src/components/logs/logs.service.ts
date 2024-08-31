import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LOGS_MODEL, LogsDocument } from 'src/Schema/log/log.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(LOGS_MODEL)
    private readonly logsModel: Model<LogsDocument>,
  ) {}

  async getAllLogs(): Promise<any[]> {
    try {
      const logs = await this.logsModel.find();
      return logs;
    } catch (err) {
      console.log(err);
    }
  }

  async findLog(id: string): Promise<any> {
    try {
      const logs = await this.logsModel.findOne({ _id: id });
      return logs;
    } catch (err) {
      console.log(err);
    }
  }
}
