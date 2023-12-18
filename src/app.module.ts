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
import { AdminPortalModule } from './components/adminPortal/adminPortal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    // MongooseModule.forRoot(
    //   `mongodb+srv://satyatyagi:o3FYeO6XX9k7stYN@cluster0.789xxlv.mongodb.net/ftp_new?retryWrites=true&w=majority`,
    // ),
    DatabaseModule,
    MongooseModelsModule,
    AuthModule,
    FileModule,
    FolderModule,
    ShareFileModule,
    AdminPortalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
