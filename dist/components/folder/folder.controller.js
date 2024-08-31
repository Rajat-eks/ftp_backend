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
exports.FolderController = void 0;
const common_1 = require("@nestjs/common");
const folder_service_1 = require("./folder.service");
const createFolder_dto_1 = require("./dto/createFolder.dto");
let FolderController = class FolderController {
    constructor(folderService) {
        this.folderService = folderService;
    }
    createFolder(createFolderDTO) {
        return this.folderService.createFolder(createFolderDTO);
    }
    getAllFolder(bodyData) {
        return this.folderService.getAllFolder(bodyData);
    }
    findAllSubFolder(bodyData) {
        return this.folderService.findAllSubFolder(bodyData);
    }
    deleteSpecificFolder(id) {
        return this.folderService.deleteSpecificFolder(id);
    }
    getFolderById(id) {
        return this.folderService.getFolderById(id);
    }
    updateFolderById(id, folderName) {
        return this.folderService.updateFolderById(id, folderName);
    }
};
exports.FolderController = FolderController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createFolder_dto_1.CreateFolderDTO]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "createFolder", null);
__decorate([
    (0, common_1.Post)('/getAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "getAllFolder", null);
__decorate([
    (0, common_1.Post)('/findAllSubFolder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "findAllSubFolder", null);
__decorate([
    (0, common_1.Delete)('/deleteFolder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "deleteSpecificFolder", null);
__decorate([
    (0, common_1.Get)('/getFolder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "getFolderById", null);
__decorate([
    (0, common_1.Patch)('/updateFolder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('folderName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], FolderController.prototype, "updateFolderById", null);
exports.FolderController = FolderController = __decorate([
    (0, common_1.Controller)('/folder'),
    __metadata("design:paramtypes", [folder_service_1.FolderService])
], FolderController);
//# sourceMappingURL=folder.controller.js.map