import { Body, Controller, Get, Post, UseGuards, Req, Param, Delete, Query } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFileDTO } from './dto/createFile.dto';

@Controller('/file')
// @UseGuards(AuthGuard())
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/uploadFile')
  createFile(
    @Body() createFileDTO: CreateFileDTO,
  ): Promise<{ message: string }> {
    return this.fileService.createFile(createFileDTO);
  }

  @Get('/getfiles/:folderID')
  getAllFilesFromFolder( 
    @Param('folderID') folderID: string,
  ): Promise<{ files: [any] }> {
    return this.fileService.getAllFilesFromFolder(folderID);
  }

  @Post('/deleteFile')
  deleteFileFromFiles( 
    @Body() bodyData: any,
  ): Promise<{ message: string }> {
    return this.fileService.deleteFileFromFiles(bodyData);
  }

 
}
