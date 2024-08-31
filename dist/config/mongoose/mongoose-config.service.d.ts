import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
export declare class MongooseConfigService implements MongooseOptionsFactory {
    private config;
    constructor(config: ConfigService);
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions>;
}
