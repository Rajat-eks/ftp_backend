import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  EVALUATION_MODEL,
  EvaluationDocument,
} from 'src/common/schemas/evaluation/evaluation.schema';
import {
  ASSIGNEDUSER_MODEL,
  AssignedUserDocument,
} from 'src/common/schemas/project/assignedUser.schema';
import { USER_MODEL, UserDocument } from 'src/common/schemas/user/user.schema';
import { sendMultipleEmail } from 'src/utils/sendEmail';

@Injectable()
export class EvalutionService {
  constructor(
    @InjectModel(EVALUATION_MODEL)
    private readonly EvaluationModel: Model<EvaluationDocument>,
    @InjectModel(ASSIGNEDUSER_MODEL)
    private readonly AssignedModel: Model<AssignedUserDocument>,
    @InjectModel(USER_MODEL)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async getEvaluation(paramData: any) {
    let result = await this.EvaluationModel.findOne({
      projectId: paramData.id,
    });
    if (result) {
      return { result };
    } else {
      return { msg: 'No record found' };
    }
  }

  async evaluationUpdate(paramData: any, bodyData: any) {
    const now = new Date();
    try {
      try {
        let newUser = await this.AssignedModel.findOne({
          projectId: paramData.projectId,
        });

        let assgn_users = [];

        for (let i = 0; i < newUser?.userId?.length; i++) {
          assgn_users.push(newUser?.userId[i].email);
        }
        assgn_users = assgn_users.concat([
        //   "amit.goel@effectualservices.com ",
        // "manoj.poonia@effectualservices.com",
        // "ritu.tyagi@effectualservices.com",
        ]);

        const users = await this.UserModel.find({
          role: { $in: ['Admin'] },
        });

        for (let i = 0; i < users.length; i++) {
          assgn_users.push(users[i].email);
        }

        function removeDuplicates(arr: any) {
          return arr.filter(
            (item: any, index: any) => arr.indexOf(item) === index,
          );
        }
        const newUserss = removeDuplicates(assgn_users);
        const res1 = await sendMultipleEmail(
          newUserss,
          'New Evalution',
          `<p>Hello User,</p>
            <p>New Evalution Report has been created with following details: </p>
             <p>All the details are below. <h4/>
             <table style=" border:1px solid black">
             <tr>
             <td style=" border:1px solid black"><b>project Id </b></td>
             <td style=" border:1px solid black">${paramData?.projectId}</td>
             </tr>
              <tr>
             <td style=" border:1px solid black"> <b> category
             </b></td>
             <td style=" border:1px solid black">${bodyData?.category}</td>
            </tr>
            <tr>
             <td style=" border:1px solid black"> <b>claimscore
             </b></td>
             <td style=" border:1px solid black">${bodyData?.claimscore}</td>
            </tr>
             <tr>
             <td style=" border:1px solid black"> <b>datacoverage</b></td>
             <td style=" border:1px solid black">${bodyData?.datacoverage}</td>
            </tr>
            <tr>
             <td style=" border:1px solid black"><b>
             Editedby
             </b></td>
             <td style=" border:1px solid black">${bodyData?.editedby}</td>
            </tr>
            <tr>
             <td style=" border:1px solid black"><b>Historyscore</b></td>
             <td style=" border:1px solid black">${bodyData?.historyscore}</td>
            </tr>
  
            <tr>
             <td style=" border:1px solid black"> <b>searchscore
             </b></td>
             <td style=" border:1px solid black">${bodyData?.searchscore}</td>
            </tr>
             <tr>
             <td style=" border:1px solid black"><b>Total Score</b></td>
             <td style=" border:1px solid black">${bodyData?.sum}</td>
            </tr>
  
            </table>
  
            <p>You can access the project here :- <a href="https://effectualrms.com/" > Click Here<a/></p>`,
        );
      } catch (err) {
        console.log(err);
      }

      let result = await this.EvaluationModel.findOneAndUpdate(
        { projectId: paramData.projectId },
        {
          $set: {
            ...bodyData,
            modification: new Date().toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata',
            }),
            projectId: paramData.projectId,
          },
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        },
      );
      return {
        result,
        msg: 'Evaluation updated successfully!',
        status: 'success',
      };
    } catch (error) {
      return {
        error,
        msg: 'Evaluation updation is failed!',
        status: 'failed',
      };
    }
  }
}
