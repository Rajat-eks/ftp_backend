import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}

  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const username = this.config.get('DATABASE_USERNAME');
    const password = this.config.get('DATABASE_PASSWORD');
    const name = this.config.get('DATABASE_NAME');

    const uri = `mongodb+srv://${username}:${password}@cluster0.tdr8p1e.mongodb.net/${name}`;

    return {
      uri,
    };
  }
}
