"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const folder_schema_1 = require("../../Schema/folder/folder.schema");
let FolderService = class FolderService {
    constructor(folderModel) {
        this.folderModel = folderModel;
    }
    async createFolder(createFolderDTO) {
        const { folderName, nextFolderID, prevFolderID, files, createdBy } = createFolderDTO;
        const newFolder = await this.folderModel?.create({
            folderName,
            nextFolderID,
            prevFolderID,
            files,
            createdBy,
        });
        return { message: 'Folder Created Sucessfully!' };
    }
    async getAllFolder(bodyData) {
        const ID = bodyData?.prevFolderID;
        const user = bodyData?.createdBy;
        try {
            const results = await this.folderModel
                .find({ prevFolderID: ID, createdBy: user })
                .exec();
            return results;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async findAllSubFolder(bodyData) {
        console.log(bodyData.nextFolderID);
        const arrayOfIds = bodyData?.nextFolderID;
        const query = {
            _id: { $in: arrayOfIds },
        };
        try {
            const results = await this.folderModel.find(query).exec();
            console.log(results);
            return results;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async deleteSpecificFolder(id) {
        try {
            let allDeleteIDs = id?.split(',');
            const filterCriteria = { _id: { $in: allDeleteIDs } };
            const results = await this.folderModel.deleteMany(filterCriteria);
            console.log(results);
            return results;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getFolderById(id) {
        try {
            const results = await this.folderModel.findById(id);
            return results;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async updateFolderById(id, folderName) {
        try {
            const results = await this.folderModel.findByIdAndUpdate(id, { $set: { folderName: folderName } }, { new: true });
            return results;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
};
exports.FolderService = FolderService;
exports.FolderService = FolderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(folder_schema_1.FOLDER_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FolderService);
//# sourceMappingURL=folder.service.js.map