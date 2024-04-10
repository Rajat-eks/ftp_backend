import { Controller, Get, Body, Post, Param, Put } from '@nestjs/common';
import { FileService } from './files.service';

@Controller('/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/')
  createFile(@Body() fileData: any): any {
    return this.fileService.createFile(fileData);
  }

  @Post('/saveToDb')
  saveFile(@Body() fileData: any): any {
    return this.fileService.saveFile(fileData);
  }

  @Post('/uploadReportAndSendEmails')
  uploadReportAndSendEmails(@Body() fileData: any): any {
    return this.fileService.uploadReportAndSendEmails(fileData);
  }

  @Get('/getFiles/:id')
  getFiles(@Param() id: any): any {
    return this.fileService.getFiles(id);
  }

  @Put('/updateStatus/:id')
  updateStatus(@Body() fileData: any,@Param() id: any): any {
    return this.fileService.updateStatus(fileData,id);
  }
}
