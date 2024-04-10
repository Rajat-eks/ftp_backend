import { Global, Module } from '@nestjs/common';
import { USER_MODEL, UserSchema } from '../schemas/user/user.schema';
import {
  PROJECT_MODEL,
  ProjectSchema,
} from '../schemas/project/project.schema';
import {
  ASSIGNEDUSER_MODEL,
  AssignedUserScema,
} from '../schemas/project/assignedUser.schema';
import {
  ATTACHMENT_MODEL,
  AttachmentSchema,
} from '../schemas/file/attachment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  COMMENTATTACHMENT_MODEL,
  CommentAttachmentSchema,
} from '../schemas/commentAttachment/commentAttachment.schema';
import {
  REPLYATTACHMENT_MODEL,
  ReplyAttachmentSchema,
} from '../schemas/replyAttachment/replyAttachment.schema';
import {
  FEEDBACK_MODEL,
  FeedbackModelSchema,
} from '../schemas/feedback/feedback.schema';
import {
  COMMENT_MODEL,
  CommentSchema,
} from '../schemas/comment/comment.schema';
import { REPLIE_MODEL, ReplieSchema } from '../schemas/replie/replie.schema';
import {
  EVALUATION_MODEL,
  EvaluationModelSchema,
} from '../schemas/evaluation/evaluation.schema';
import {
  PROJECTDRAFT_MODEL,
  ProjectDraftsSchema,
} from '../schemas/projectDraft/projectDraft.schema';
import { TOKEN_MODEL, TokenSchema } from '../schemas/token/token.schema';

const MODELS = [
  { name: USER_MODEL, schema: UserSchema },
  { name: PROJECT_MODEL, schema: ProjectSchema },
  { name: ASSIGNEDUSER_MODEL, schema: AssignedUserScema },
  { name: ATTACHMENT_MODEL, schema: AttachmentSchema },
  { name: COMMENTATTACHMENT_MODEL, schema: CommentAttachmentSchema },
  { name: REPLYATTACHMENT_MODEL, schema: ReplyAttachmentSchema },
  { name: ASSIGNEDUSER_MODEL, schema: AssignedUserScema },
  { name: FEEDBACK_MODEL, schema: FeedbackModelSchema },
  { name: COMMENT_MODEL, schema: CommentSchema },
  { name: REPLIE_MODEL, schema: ReplieSchema },
  { name: EVALUATION_MODEL, schema: EvaluationModelSchema },
  { name: PROJECTDRAFT_MODEL, schema: ProjectDraftsSchema },
  { name: TOKEN_MODEL, schema: TokenSchema },
];

@Global()
@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule],
})
export class MongooseModelsModule {}
