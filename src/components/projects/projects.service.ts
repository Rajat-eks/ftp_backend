import {
  Injectable,
  BadRequestException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PROJECT_MODEL,
  ProjectDocument,
} from 'src/common/schemas/project/project.schema';
import {
  ASSIGNEDUSER_MODEL,
  AssignedUserDocument,
} from 'src/common/schemas/project/assignedUser.schema';
import { format } from 'date-fns';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { sendMultipleEmail } from 'src/utils/sendEmail';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(PROJECT_MODEL)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(ASSIGNEDUSER_MODEL)
    private readonly AssignedModel: Model<AssignedUserDocument>,
    @InjectModel(USER_MODEL)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async getProject() {
    try {
      const data = await this.projectModel
        .find()
        .sort({ createdAt: 'desc' });
      return data;
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async findSearchObject(searchObject: any) {
    try {
      const data = await this.projectModel.findOne({
        searchObject: searchObject?.searchObject,
      });

      if (data?.searchObject) {
        return {
          msg: 'Search Object already exist!',
          status: 'failed',
        };
      }
      return {
        msg: 'This is an unique Search Object.',
        status: 'success',
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async createProject(createProject: any) {
    try {
      //getting incremented series of projectId
      const result = await this.projectModel.countDocuments().exec();
      //logic to create a custom projectId
      const now = new Date();
      const formattedToday = format(now, 'ddmmyy');
      const generatedProjectId = `EKS-${formattedToday}-${result + 1}`;

      const data = await this.projectModel.create({
        projectId: generatedProjectId,
        searchObject: createProject.SearchObject,
        patentNumber: createProject.KnownPriorArt,
        TypeOfSearch: createProject.ClaimsToBeSearched,
        reqDelivery: createProject.RequirementForDelivery,
        projectName: createProject.ProjectName,
        requesterName: createProject.requesterName,
        deliveryDate: createProject.RequirementDeliveryDate,
        priorArtDate: createProject.PriorArtCuttOffDate,
        emailContent: createProject.emailContent,
        info: createProject.UsefulInformationForSearch,
        status: 'Progress',
        projectManager: createProject.ProjectManager,
        //       requestedDate: date.format(now, "YYYY-MM-DD HH:mm:ss"),
        requestedDate: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
        }),
        createdById: createProject.CreatedById,
        completedDate: createProject.CompletedDate,
        jurisdiction: createProject.Jurisdiction,
        include: createProject.Include,
        technicalField: createProject.TechnicalField,
        standard: createProject.StandardRelated,
        sso: createProject.SSONeeded,
        usipr: createProject.USIPRSpecial,
        impClaim: createProject.ImportantClaims,
        nonImpClaim: createProject.UnimportantClaims,
        createdBy: createProject?.createdBy,
        techId: createProject.techId,
      });
      const info = await data.save();

      //<---------  for sending  project creation email to all clients  ----->

      const users = await this.UserModel.find({
        role: { $in: ['Admin'] },
      });

      for (let i = 0; i < users.length; i++) {
        const a = await sendMultipleEmail(
          users[i].email,
          'New Project',
          `<p>Hello User,</p>
          <p>New Project has been created with the following details: </p>
           <p>All the details are below. <h4/>
           <table style=" border:1px solid black">
           <tr>
           <td style=" border:1px solid black"> <b> Project Id </b> </td>
           <td style=" border:1px solid black">${info.projectId}</td>
           </tr>
          <tr>
           <td style=" border:1px solid black"> <b> Created by </b></td>
           <td style=" border:1px solid black">${info.createdBy} </td>
          </tr>
            <tr>
           <td style=" border:1px solid black"> <b> Search Object </b></td>
           <td style=" border:1px solid black">${info.searchObject}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"> <b>Type Of Search</b></td>
           <td style=" border:1px solid black">${info.TypeOfSearch}</td>
          </tr>

          <tr>
           <td style=" border:1px solid black"><b>Project Name</b></td>
           <td style=" border:1px solid black">${info.projectName}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b> Delivery Date</b></td>
           <td style=" border:1px solid black">${info.deliveryDate}</td>
          </tr>

           <tr>
           <td style=" border:1px solid black"><b>Status</b></td>
           <td style=" border:1px solid black">${info.status}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>Project Manager</b></td>
           <td style=" border:1px solid black">${info.projectManager}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>Requested Date</b></td>
           <td style=" border:1px solid black">${info.requestedDate}</td>
          </tr>

          <tr>
           <td style=" border:1px solid black"> <b> Technical Field </b></td>
           <td style=" border:1px solid black">${info.technicalField}</td>
          </tr>

          </table>

           <p> Click here to access the link :- <a href="https://effepro.com" > Click here </a> </p>
         `,
        );
      }

      return {
        ...info.toJSON(),
        msg: 'Project has been created Successfully!',
        status: 'success',
      };
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async UpdateProject(updateData: any, id: string) {
    try {
      const result = await this.projectModel.findOneAndUpdate(
        { projectId: id },
        {
          searchObject: updateData.SearchObject,
          patentNumber: updateData.KnownPriorArt,
          TypeOfSearch: updateData.ClaimsToBeSearched,
          reqDelivery: updateData.RequirementForDelivery,
          projectName: updateData.ProjectName,
          requesterName: updateData.requesterName,
          deliveryDate: updateData.RequirementDeliveryDate,
          priorArtDate: updateData.PriorArtCuttOffDate,
          emailContent: updateData.EmailContent,
          info: updateData.UsefulInformationForSearch,
          projectManager: updateData.ProjectManager,
          // createdById: req.body.CreatedById,
          completedDate: updateData.CompletedDate,
          jurisdiction: updateData.Jurisdiction,
          include: updateData.Include,
          technicalField: updateData.TechnicalField,
          standard: updateData.StandardRelated,
          sso: updateData.SSONeeded,
          usipr: updateData.USIPRSpecial,
          impClaim: updateData.ImportantClaims,
          nonImpClaim: updateData.UnimportantClaims,
          techId: updateData.techId,
        },
      );

      //<---------  for sending  project updation email to all clients  ----->

      // const users = await UserModel.find({
      //   role: { $in: ["Client Admin"] },
      // });

      // for (let i = 0; i < users.length; i++) {
      //   const a = await sendMultipleEmail(
      //     users[i].email,
      //     `${result.projectId} Project has been updated `,
      //     `<p>Hello User,</p>
      //     <p>New Project has been created with the following details: </p>
      //      <p>All the details are below. <h4/>
      //      <table style=" border:1px solid black">
      //      <tr>
      //      <td style=" border:1px solid black"> <b> Project Id </b> </td>
      //      <td style=" border:1px solid black">${result.projectId}</td>
      //      </tr>
      //     <tr>
      //      <td style=" border:1px solid black"> <b> Created by </b></td>
      //      <td style=" border:1px solid black">${result.createdBy} </td>
      //     </tr>
      //       <tr>
      //      <td style=" border:1px solid black"> <b> Search Object </b></td>
      //      <td style=" border:1px solid black">${result.searchObject}</td>
      //     </tr>
      //     <tr>
      //      <td style=" border:1px solid black"> <b>Type Of Search</b></td>
      //      <td style=" border:1px solid black">${result.TypeOfSearch}</td>
      //     </tr>

      //     <tr>
      //      <td style=" border:1px solid black"><b>Project Name</b></td>
      //      <td style=" border:1px solid black">${result.projectName}</td>
      //     </tr>
      //     <tr>
      //      <td style=" border:1px solid black"><b> Delivery Date</b></td>
      //      <td style=" border:1px solid black">${result.deliveryDate}</td>
      //     </tr>

      //      <tr>
      //      <td style=" border:1px solid black"><b>Status</b></td>
      //      <td style=" border:1px solid black">${result.status}</td>
      //     </tr>
      //     <tr>
      //      <td style=" border:1px solid black"><b>Project Manager</b></td>
      //      <td style=" border:1px solid black">${result.projectManager}</td>
      //     </tr>
      //     <tr>
      //      <td style=" border:1px solid black"><b>Requested Date</b></td>
      //      <td style=" border:1px solid black">${result.requestedDate}</td>
      //     </tr>

      //     <tr>
      //      <td style=" border:1px solid black"> <b> Technical Field </b></td>
      //      <td style=" border:1px solid black">${result.technicalField}</td>
      //     </tr>

      //     </table>

      //      <p> Click here to access the link :- <a href="https://effepro.com" > Click here </a> </p>
      //    `
      //   );
      // }

      return {
        ...result.toJSON(),
        msg: 'Project Successfully updated!',
        status: 'success',
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async GetOneProject(id: string) {
    try {
      const data = await this.projectModel.findOne({ projectId: id });
      return data;
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async getProjectsAssignedToUser(userId: string) {
    try {
      //finding those prjectsIds in which user is assigned with given userId
      const data = await this.AssignedModel.find({
        'userId._id': userId,
      }).select({ projectId: 1, _id: 0 });
      //making array of projectIds to pass in $in
      const projectIds = data?.map((item) => item?.projectId);
      //finding all projects with in array of project Ids.
      const projects = await this.projectModel.find({
        projectId: { $in: projectIds },
      });
      return projects;
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }

  async TerminateProjectStatus(projectId: string) {
    try {
      await this.projectModel.findOneAndUpdate(
        { projectId: projectId },
        {
          status: 'Terminated',
        },
      );
      return {
        msg: 'Project has been successfully terminated.',
        status: 'success',
      };
    } catch (err) {
      if (err.name === 'ValidationError') {
        throw new BadRequestException(err.errors);
      }
      throw new ServiceUnavailableException();
    }
  }
}
