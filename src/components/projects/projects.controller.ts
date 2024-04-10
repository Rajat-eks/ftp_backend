import { Body, Controller, Get, Post,Put ,Param} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CREATEPROJECTDTO } from './dto/create-project.dto';

@Controller('/projects')
export class ProjectsController {
  constructor(private ProjectsService: ProjectsService) {}

  @Get('/')
  getProject() :any {
    return this.ProjectsService.getProject();
  }

  @Post('/findSearchObject')
  findSearchObject(@Body() searchObject:any) :any {
    return this.ProjectsService.findSearchObject(searchObject);
  }

  @Post('/create')
  createProject(@Body() createProject:any) :any {
    return this.ProjectsService.createProject(createProject);
  }
  
  @Put('/update/:id')
  UpdateProject(@Body() updateData:any, @Param('id') id: string) :any {
    return this.ProjectsService.UpdateProject(updateData,id);
  }

  @Get('/:id')
  GetOneProject( @Param('id') id: string) :any {
    return this.ProjectsService.GetOneProject(id);
  }
  
  @Get('/getProjectsAssignedToUser/:userId')
  getProjectsAssignedToUser( @Param('userId') userId: string) :any {
    return this.ProjectsService.getProjectsAssignedToUser(userId);
  }

  @Put('/terminateProjectStatus/:projectId')
  TerminateProjectStatus( @Param('projectId') projectId: string) :any {
    return this.ProjectsService.TerminateProjectStatus(projectId);
  }
    
}