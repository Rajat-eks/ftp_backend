import { Controller, Get ,Post,Body,Param,Delete,Query} from '@nestjs/common';
import { CommentAttachmentService } from './commentAttachment.service';

@Controller('/commentFiles')
export class commentAttachmentController {
  constructor(private readonly commentAttachmentService: CommentAttachmentService) {}

  @Post('/createFile')
  createFile(@Body() data:any): any {
    return this.commentAttachmentService.createFile(data);
  }
  
  @Post('/saveToDb')
  saveFile(@Body() data:any): any {
    return this.commentAttachmentService.saveFile(data);
  }

  @Get('/client/:projectId')
  getFilesOfClient(@Param() projectId:any): any {
    return this.commentAttachmentService.getFilesOfClient(projectId);
  }
  
  @Get('/:projectId')
  getFilesOfEffectual(@Param() projectId:any): any {
    return this.commentAttachmentService.getFilesOfEffectual(projectId);
  }
  @Get('/getFiles/:id')
  getFiles(@Param() id:any): any {
    return this.commentAttachmentService.getFiles(id);
  }

  @Delete('/client/deleteFile')
  deleteClientFile(@Query() data:any): any {
    return this.commentAttachmentService.deleteClientFile(data);
  }

  @Delete('/effectual/deleteFile')
  deleteEffectualFile(@Query() data:any): any {
    return this.commentAttachmentService.deleteEffectualFile(data);
  }
}
