import { Body, Controller, Get, Post, UseGuards, Req, Delete, Param, Put, Patch } from '@nestjs/common';
import { FolderService } from './folder.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateFolderDTO } from './dto/createFolder.dto';

@Controller('/folder')
// @UseGuards(AuthGuard())
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post('/create')
  createFolder(
    @Body() createFolderDTO: CreateFolderDTO,
  ): Promise<{ message: string }> {
    return this.folderService.createFolder(createFolderDTO);
  }

  @Post('/getAll')
  getAllFolder(@Body() bodyData:any): Promise<any> {
    return this.folderService.getAllFolder(bodyData);
  }

  @Post('/findAllSubFolder')
  findAllSubFolder(@Body() bodyData: any): Promise<any> {
    return this.folderService.findAllSubFolder(bodyData);
  }

  @Delete('/deleteFolder/:id')
  deleteSpecificFolder(@Param('id') id: string): Promise<any> {
    return this.folderService.deleteSpecificFolder(id);
  }

  @Get('/getFolder/:id')
  getFolderById(@Param('id') id: string): Promise<any> {
    return this.folderService.getFolderById(id);
  }

  @Patch('/updateFolder/:id')
  updateFolderById(@Param('id') id: string,@Body('folderName') folderName:string ): Promise<any> {
    return this.folderService.updateFolderById(id,folderName);
  }
}
