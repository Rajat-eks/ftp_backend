import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PROJECTDRAFT_MODEL,
  ProjectDraftsDocument,
} from 'src/common/schemas/projectDraft/projectDraft.schema';

@Injectable()
export class DraftService {
  constructor(
    @InjectModel(PROJECTDRAFT_MODEL)
    private readonly ProjectDraftsModel: Model<ProjectDraftsDocument>,
  ) {}
  async getDrafts() {
    try {
      const data = await this.ProjectDraftsModel.find().sort({
        requestedDate: 'desc',
      });

      return data;
    } catch (e) {
      return 'Error - ' + e;
    }
  }
  async getOneDraft(paramData: any) {
    try {
      const data = await this.ProjectDraftsModel.findOne({ _id: paramData.id });
      return data;
    } catch (error) {
      return error;
    }
  }
  async createDraft(bodyData: any) {
    try {
      const data = await this.ProjectDraftsModel.create({
        searchObject: bodyData.SearchObject,
        patentNumber: bodyData.KnownPriorArt,
        typeOfSearch: bodyData.ClaimsToBeSearched,
        reqDelivery: bodyData.RequirementForDelivery,
        projectName: bodyData.ProjectName,
        requesterName: bodyData.requesterName,
        deliveryDate: bodyData.RequirementDeliveryDate,
        priorArtDate: bodyData.PriorArtCuttOffDate,
        emailContent: bodyData.emailContent,
        info: bodyData.UsefulInformationForSearch,
        projectManager: bodyData.ProjectManager,
        createdById: bodyData.CreatedById,
        completedDate: bodyData.CompletedDate,
        jurisdiction: bodyData.Jurisdiction,
        include: bodyData.Include,
        technicalField: bodyData.TechnicalField,
        standard: bodyData.StandardRelated,
        sso: bodyData.SSONeeded,
        usipr: bodyData.USIPRSpecial,
        impClaim: bodyData.ImportantClaims,
        nonImpClaim: bodyData.UnimportantClaims,
        createdBy: bodyData.createdBy,
        techId: bodyData.techId,
        files: bodyData?.files,
        assignedUsers: bodyData?.assignedUsers,
      });
      const info = await data.save();
      return {
        msg: 'Draft has been created Successfully!',
        status: 'success',
      };
    } catch (error) {
      console.log('Error', error);
      return {
        msg: 'Sorry, Draft could not be created due to server issue',
        status: 'failed',
      };
    }
  }

  async deleteDraft(paramData: any) {
    try {
      const data = await this.ProjectDraftsModel.findOneAndDelete({
        _id: paramData.id,
      });
      return { msg: 'Draft Deleted Sucessfull!' };
    } catch (error) {
      return { msg: error };
    }
  }

  async updateDraft(paramData: any, bodyData: any) {
    try {
      const data = await this.ProjectDraftsModel.findByIdAndUpdate(
        { _id: paramData.id },
        {
          searchObject: bodyData?.SearchObject,
          patentNumber: bodyData.KnownPriorArt,
          typeOfSearch: bodyData.ClaimsToBeSearched,
          reqDelivery: bodyData.RequirementForDelivery,
          projectName: bodyData.ProjectName,
          requesterName: bodyData.requesterName,
          deliveryDate: bodyData.RequirementDeliveryDate,
          priorArtDate: bodyData.PriorArtCuttOffDate,
          emailContent: bodyData.emailContent,
          info: bodyData.UsefulInformationForSearch,
          projectManager: bodyData.ProjectManager,
          createdById: bodyData.CreatedById,
          completedDate: bodyData.CompletedDate,
          jurisdiction: bodyData.Jurisdiction,
          include: bodyData.Include,
          technicalField: bodyData.TechnicalField,
          standard: bodyData.StandardRelated,
          sso: bodyData.SSONeeded,
          usipr: bodyData.USIPRSpecial,
          impClaim: bodyData.ImportantClaims,
          nonImpClaim: bodyData.UnimportantClaims,
          createdBy: bodyData.createdBy,
          techId: bodyData.techId,
          files: bodyData?.files,
          assignedUsers: bodyData?.assignedUsers,
        },
      );

      return {
        msg: 'Draft has been Updated Successfully!',
        status: 'success',
      };
    } catch (error) {
      return {
        msg: 'Sorry, Draft could not be updated due to server issue',
        status: 'failed',
      };
    }
  }
}
