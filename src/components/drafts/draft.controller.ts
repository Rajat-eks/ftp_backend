import { Controller, Get,Param,Post,Body ,Delete,Put} from '@nestjs/common';
import { DraftService } from './draft.service';

@Controller('/drafts')
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Get('/')
  getDrafts(): any {
    return this.draftService.getDrafts();
  }

  @Get('/:id')
  getOneDraft(@Param() paramData:any): any {
    return this.draftService.getOneDraft(paramData);
  }
  @Post('/createDraft')
  createDraft(@Body() bodyData:any): any {
    return this.draftService.createDraft(bodyData);
  }
  @Delete('/delete/:id')
  deleteDraft(@Param() paramData:any): any {
    return this.draftService.deleteDraft(paramData);
  }
  @Put('/update/:id')
  updateDraft(@Param() paramData:any,@Body() bodyData:any): any {
    return this.draftService.updateDraft(paramData,bodyData);
  }
}
