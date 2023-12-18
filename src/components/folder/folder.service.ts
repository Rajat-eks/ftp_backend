import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FILE_MODEL, FileDocument } from 'src/Schema/file/file.schema';
import mongoose, { Model } from 'mongoose';
import { CreateFolderDTO } from './dto/createFolder.dto';
import { FOLDER_MODEL, FolderDocument } from 'src/Schema/folder/folder.schema';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(FOLDER_MODEL)
    private readonly folderModel: Model<FolderDocument>,
  ) {}
  async createFolder(
    createFolderDTO: CreateFolderDTO,
  ): Promise<{ message: string }> {
    const { folderName, nextFolderID, prevFolderID, files, createdBy } =
      createFolderDTO;

    const newFolder = await this.folderModel?.create({
      folderName,
      nextFolderID,
      prevFolderID,
      files,
      createdBy,
    });

    return { message: 'Folder Created Sucessfully!' };
  }

  async getAllFolder(bodyData: any): Promise<any> {
    const ID = bodyData?.prevFolderID;
    const user = bodyData?.createdBy;

    try {
      const results = await this.folderModel
        .find({ prevFolderID: ID, createdBy: user })
        .exec();
      return results;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be handled by the caller
    }
  }

  async findAllSubFolder(bodyData: any): Promise<any> {
    console.log(bodyData.nextFolderID);
    const arrayOfIds = bodyData?.nextFolderID;
    const query = {
      _id: { $in: arrayOfIds },
    };

    try {
      const results = await this.folderModel.find(query).exec();
      console.log(results);
      return results;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be handled by the caller
    }
  }

  async deleteSpecificFolder(id: string): Promise<any> {
    try {
      const results = await this.folderModel.findByIdAndDelete(id);
      console.log(results);
      return results;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be handled by the caller
    }
  }
  async getFolderById(id: string): Promise<any> {
    try {
      const results = await this.folderModel.findById(id);
      return results;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be handled by the caller
    }
  }
  async updateFolderById(id: string, folderName: string): Promise<any> {
    try {
      const results = await this.folderModel.findByIdAndUpdate(
        id,
        { $set: { folderName: folderName } },
        { new: true },
      );
      return results;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be handled by the caller
    }
  }
}
