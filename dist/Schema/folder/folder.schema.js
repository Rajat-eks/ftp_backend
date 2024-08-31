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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOLDER_MODEL = exports.FolderSchema = exports.Folder = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Folder = class Folder {
};
exports.Folder = Folder;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Folder.prototype, "folderName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Folder.prototype, "nextFolderID", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Folder.prototype, "prevFolderID", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Folder.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Folder.prototype, "files", void 0);
exports.Folder = Folder = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Folder);
exports.FolderSchema = mongoose_1.SchemaFactory.createForClass(Folder);
exports.FOLDER_MODEL = Folder.name;
//# sourceMappingURL=folder.schema.js.map