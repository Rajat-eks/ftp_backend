import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/mongoose/database.module';
import { MongooseModelsModule } from './common/model/mongoose-model.module';
import { AuthModule } from './components/auth/auth.module';
import { ProjectsModule } from './components/projects/projects.module';
import { FileModule } from './components/files/files.module';
import { CommentAttachmentModule } from './components/commentAttachment/commentAttachment.module';
import { ReplyAttachmentModule } from './components/replyAttachment/replyAttachment.module';
import { UserModule } from './components/user/user.module';
import { FeedbackModule } from './components/feedback/feedback.module';
import { ReplieModule } from './components/replie/replie.module';
import { DiscussionModule } from './components/discussion/discussion.module';
import { AssignedUserModule } from './components/assignedUser/assignedUser.module';
import { EvalutionModule } from './components/evalution/evalution.module';
import { DraftModule } from './components/drafts/draft.module';
import { CommentModule } from './components/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.production.env', '.development.env'],
      isGlobal: true,
    }),
    DatabaseModule,
    MongooseModelsModule,
    AuthModule,
    ProjectsModule,
    FileModule,
    CommentAttachmentModule,
    ReplyAttachmentModule,
    UserModule,
    FeedbackModule,
    ReplieModule,
    DiscussionModule,
    AssignedUserModule,
    EvalutionModule,
    DraftModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
