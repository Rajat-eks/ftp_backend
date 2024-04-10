import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ATTACHMENT_MODEL,
  AttachmentDocument,
} from 'src/common/schemas/file/attachment.schema';
import {
  ASSIGNEDUSER_MODEL,
  AssignedUserDocument,
} from 'src/common/schemas/project/assignedUser.schema';
import {
  PROJECT_MODEL,
  ProjectDocument,
} from 'src/common/schemas/project/project.schema';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { sendMultipleEmail } from 'src/utils/sendEmail';

@Injectable()
export class AssignedUserService {
  constructor(
    @InjectModel(ASSIGNEDUSER_MODEL)
    private readonly assignedUsersModel: Model<AssignedUserDocument>,
    @InjectModel(PROJECT_MODEL)
    private readonly projectModel: Model<ProjectDocument>,
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(ATTACHMENT_MODEL)
    private readonly attachmentModel: Model<AttachmentDocument>,
  ) {}

  async createAssignedUser(bodyData: any) {
    try {
      let newUser = new this.assignedUsersModel({
        userId: bodyData.userId,
        projectId: bodyData.projectId,
      });
      let result = await newUser.save();
      ({
        result,
        msg: 'user is assigned to the project',
        status: 'success',
      });

      const project = await this.projectModel.findOne({
        projectId: newUser.projectId,
      });

      const fileAttachment = await this.attachmentModel.findOne({
        projectId: newUser.projectId,
      });

      console.log('this is file attachment', fileAttachment);
      let assg_userss = [];

      // for assigned  users email

      for (let i = 0; i < newUser.userId.length; i++) {
        assg_userss.push(newUser.userId[i].email);
      }

      // for Effectual Management email

      assg_userss = assg_userss.concat([
        // "amit.goel@effectualservices.com ",
        // "manoj.poonia@effectualservices.com",
        // "ritu.tyagi@effectualservices.com",
      ]);

      // for client email

      const clients = await this.userModel.find({
        role: { $in: ['Admin'] },
      });
      for (let i = 0; i < clients.length; i++) {
        assg_userss.push(clients[i].email);
      }

      function removeDuplicates(arr: any) {
        return arr.filter(
          (item: any, index: any) => arr.indexOf(item) === index,
        );
      }
      console.log(project);
      const newUsers = removeDuplicates(assg_userss);
      const b = await sendMultipleEmail(
        newUsers,
        'New Project',
        `<p>Hello User,</p>
          <p>New Project has been created with following details: </p>
           <p>All the details are below. <h4/>
           <table style=" border:1px solid black">
           <tr>
           <td style=" border:1px solid black"> <b> Project Information: </b> </td>
           <td style=" border:1px solid black">${project?.projectName}</td>
           </tr>
           <tr>
           <td style=" border:1px solid black"> <b> Search Object: </b></td>
           <td style=" border:1px solid black">${project?.searchObject}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"> <b>Known prior art: </b></td>
           <td style=" border:1px solid black">${project?.patentNumber}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>Technical field: </b></td>
           <td style=" border:1px solid black">${project.technicalField}</td>
          </tr>

          <tr>
           <td style=" border:1px solid black"><b>Claims to be searched:</b></td>
           <td style=" border:1px solid black">${project.TypeOfSearch}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>Requirement for delivery:</b></td>
           <td style=" border:1px solid black">${project.reqDelivery}</td>
          </tr>
          
          <tr>
           <td style=" border:1px solid black"><b>Required delivery date:</b></td>
           <td style=" border:1px solid black">${project.deliveryDate}</td>
          </tr>

          <tr>
           <td style=" border:1px solid black"><b>Prior Art Cut-off-date:</b></td>
           <td style=" border:1px solid black">${project.priorArtDate}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>Standard related:</b></td>
           <td style=" border:1px solid black">${project.standard}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>SSO needed:</b></td>
           <td style=" border:1px solid black">${project.sso}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>US IPR special:</b></td>
           <td style=" border:1px solid black">${project.usipr}</td>
          </tr>
          <tr>
           <td style=" border:1px solid black"><b>Useful information for search:</b></td>
           <td style=" border:1px solid black">${project.info}</td>
          </tr>
          
          </table>
         <p> Click here to access the link :- <a href="https://effepro.com" > Click here </a> </p>
         `,
      );
    } catch (error) {
      return {
        error,
        msg: 'Sorry,user is not assigned to the project',
        status: 'failed',
      };
    }
  }

  async getAssignedUser() {
    let item = await this.assignedUsersModel.find();
    if (item.length > 0) {
      return item;
    } else {
      return { result: 'data not found' };
    }
  }

  async assignedUserGetById(id: any) {
    let result = await this.assignedUsersModel.findOne({ projectId: id.id });
    if (result) {
      return result;
    } else {
      return { result: 'no record found' };
    }
  }

  async removeAssignedUser(paramData: any) {
    let result = await this.assignedUsersModel.findByIdAndUpdate(
      { _id: paramData.id },
      { $pull: { userId: { _id: paramData.userId } } },
    );
    return result;
  }

  async updateAssignedUser(paramData: any, bodyData: any) {
    const result = await this.assignedUsersModel.findOneAndUpdate(
      { projectId: paramData.id },

      {
        $push: { userId: { $each: bodyData.userId } },
        projectId: bodyData.projectId,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
    const project = await this.projectModel.findOne({
      projectId: result.projectId,
    });

    // for (let i = 0; i < result.userId.length; i++) {
    //   const a = await sendMultipleEmail(
    //     result.userId[i].email,
    //     "A Project Assigned",
    //     `<p>Hello User,</p>
    //     <p>A new project has been assigned to you</p>
    //        <p>All the details are below. <h4/>
    //        <table style=" border:1px solid black">
    //        <tr>
    //        <td style=" border:1px solid black"> <b> Project Id </b> </td>
    //        <td style=" border:1px solid black">${project.projectId}</td>
    //        </tr>
    //         <tr>
    //        <td style=" border:1px solid black"> <b> Search Object </b></td>
    //        <td style=" border:1px solid black">${project.searchObject}</td>
    //       </tr>
    //       <tr>
    //        <td style=" border:1px solid black"> <b>Type Of Search</b> </td>
    //        <td style=" border:1px solid black">${project.TypeOfSearch}</td>
    //       </tr>

    //       <tr>
    //        <td style=" border:1px solid black"> <b>Project Name</b> </td>
    //        <td style=" border:1px solid black">${project.projectName}</td>
    //       </tr>
    //       <tr>
    //        <td style=" border:1px solid black"><b> Delivery Date</b></td>
    //        <td style=" border:1px solid black">${project.deliveryDate}</td>
    //       </tr>

    //        <tr>
    //        <td style=" border:1px solid black"><b>Status</b></td>
    //        <td style=" border:1px solid black">${project.status}</td>
    //       </tr>
    //       <tr>
    //        <td style=" border:1px solid black"><b>Project Manager</b></td>
    //        <td style=" border:1px solid black">${project.projectManager}</td>
    //       </tr>
    //       <tr>
    //        <td style=" border:1px solid black"><b>Requested Date</b></td>
    //        <td style=" border:1px solid black">${project.requestedDate}</td>
    //       </tr>

    //       <tr>
    //        <td style=" border:1px solid black"> <b> Technical Field </b></td>
    //        <td style=" border:1px solid black">${project.technicalField}</td>
    //       </tr>

    //       </table>

    //       <p>You can access the project here :- <a href="https://effectualrms.com/" > Click Here<a/></p>`
    //   );
    // }
    return result;
  }
}
