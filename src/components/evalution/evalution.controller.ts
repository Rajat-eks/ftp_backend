import { Controller, Get, Param,Post,Body } from '@nestjs/common';
import { EvalutionService } from './evalution.service';

@Controller('/evaluation')
export class EvalutionController {
  constructor(private readonly evalutionService: EvalutionService) {}

  @Get('/getById/:id')
  getEvaluation(@Param() paramData: any): any {
    return this.evalutionService.getEvaluation(paramData);
  }

  @Post('/:projectId')
  evaluationUpdate(@Param() paramData: any,@Body() bodyData:any): any {
    return this.evalutionService.evaluationUpdate(paramData,bodyData);
  }
}
