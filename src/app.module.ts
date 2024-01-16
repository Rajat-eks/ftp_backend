import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModelsModule } from './Schema/mongoose-model.module';
import { DatabaseModule } from './config/mongoose/mongoose.module';
import { FileModule } from './components/file/file.module';
import { FolderModule } from './components/folder/folder.module';
import { ShareFileModule } from './components/shareFIles/shareFiles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { S3UploadModule } from './components/s3/s3Upload.module';
// import { LogsModule } from './components/logs/logs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptors';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    // LogsModule,
    DatabaseModule,
    MongooseModelsModule,
    AuthModule,
    FileModule,
    FolderModule,
    ShareFileModule,
    S3UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
  ],
})
export class AppModule {}
