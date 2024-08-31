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
exports.CreateFileDTO = void 0;
const class_validator_1 = require("class-validator");
const auth_schema_1 = require("../../../Schema/auth/auth.schema");
class CreateFileDTO {
}
exports.CreateFileDTO = CreateFileDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateFileDTO.prototype, "files", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFileDTO.prototype, "currenFolderID", void 0);
__decorate([
    (0, class_validator_1.IsEmpty)({ message: 'You cannot pass user id' }),
    __metadata("design:type", auth_schema_1.User)
], CreateFileDTO.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileDTO.prototype, "userEmail", void 0);
//# sourceMappingURL=createFile.dto.js.map