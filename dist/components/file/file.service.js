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
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const folder_schema_1 = require("../../Schema/folder/folder.schema");
const moment = require("moment");
const sendMail_1 = require("../../utils/sendMail");
let FileService = class FileService {
    constructor(folderModel) {
        this.folderModel = folderModel;
    }
    async createFile(createFileDTO) {
        const { currenFolderID, files, userEmail } = createFileDTO;
        let folder = await this.folderModel.findById(currenFolderID);
        folder?.files?.push(...files);
        let { _id, ...updatedData } = folder;
        const updatedFiles = await this.folderModel
            .findByIdAndUpdate(folder?._id, updatedData)
            .exec();
        (0, sendMail_1.sendEmail)('satya.tyagi@effectualservices.com', `File Upload`, `  <h3>Hi,</h3>
 <br>
 File uploaded by: ${userEmail}<br>
 <div style="max-height: 350px; overflow: auto;">
   <table style="width: 100%; border: 2px solid #000; border-radius: 5px;">
     <thead style="border-bottom: 2px solid #000;">
       <tr>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px; text-align: left; border-right: 2px solid #000;">
           S.N.
         </th>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px 20px; text-align: left; border-right: 2px solid #000;">
           File Name
         </th>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px; text-align: left; border-right: 2px solid #000;">
           File Size
         </th>
         <th style="font-size: 17px; font-weight: 600; color: #000; padding: 4px 10px; text-align: left; border-right: 2px solid #000;">
           Date
         </th>
       </tr>
     </thead>
     <tbody>
       ${files
            .map((item, id) => `
         <tr style="background-color: #fff; border-bottom: 1px solid #000; transition: background-color 0.3s ease-in-out;">
           <td style="padding: 6px 4px; white-space: nowrap; font-size: 14px; font-weight: medium; color: #000; border-right: 2px solid #000;">
             ${id + 1}
           </td>
           <td style="font-size: 14px; color: #007bff; font-weight: 500; padding: 6px 6px; white-space: nowrap; border-right: 2px solid #000; cursor: pointer;">
             <a href="${item.filePath}" style="text-decoration: none; color: #007bff;">${item.fileName}</a>
           </td>
           <td style="font-size: 14px; color: #000; font-weight: 500; padding: 6px 6px; white-space: nowrap; border-right: 2px solid #000;">
             ${item.fileSize}
           </td>
           <td style="font-size: 14px; color: #000; font-weight: 500; padding: 6px 6px; white-space: nowrap; border-right: 2px solid #000;">
             ${moment(item.dateAndTime).format('YYYY-MM-DD hh:mm a')}
           </td>
         </tr>
       `)
            .join('')}
     </tbody>
   </table>
 </div>`);
        return { message: 'Upload File Sucessfully!' };
    }
    async getAllFilesFromFolder(folderID) {
        try {
            let folder = await this.folderModel.findById(folderID);
            return { files: folder?.files };
        }
        catch (err) {
            console.log(err);
        }
    }
    async deleteFileFromFiles(bodyData) {
        const { folderID, files } = bodyData;
        let folder = await this.folderModel.findById(folderID);
        let updatedFile = (folder?.files || []).filter((item) => !files.some((file) => file.fileName === item.fileName && file.fileSize === item.fileSize));
        let { folderName, nextFolderID, prevFolderID, createdBy } = folder;
        await this.folderModel.findOneAndUpdate({ _id: folderID }, {
            $set: {
                folderName,
                nextFolderID,
                prevFolderID,
                createdBy,
                files: updatedFile,
            },
        }, { returnDocument: 'after' });
        return { message: 'File Delete Sucessfully', files: updatedFile };
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(folder_schema_1.FOLDER_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FileService);
//# sourceMappingURL=file.service.js.map