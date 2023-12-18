import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
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

    const uri = `mongodb+srv://${username}:${password}@cluster0.789xxlv.mongodb.net/${name}?retryWrites=true&w=majority`;

    return {
      uri,
   //   useNewUrlParser: true, // Optional: Use the new URL parser
     // useUnifiedTopology: true, // Optional: Use the new Server Discover and Monitoring engine
    //  autoReconnect: true, // Enable automatic reconnection
    //  reconnectTries: Number.MAX_VALUE, // Retry indefinitely (or set a specific number of retry attempts)
    //  reconnectInterval: 1000, // Retry every 1 second
    };
  }
}
