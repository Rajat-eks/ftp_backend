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
exports.LOGS_MODEL = exports.LogsSchema = exports.Logs = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Logs = class Logs {
};
exports.Logs = Logs;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Logs.prototype, "userEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Logs.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [] }),
    __metadata("design:type", Array)
], Logs.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Logs.prototype, "folder", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Logs.prototype, "senderEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Logs.prototype, "isDomainSame", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Logs.prototype, "isFileShare", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Logs.prototype, "isFolderShare", void 0);
exports.Logs = Logs = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Logs);
exports.LogsSchema = mongoose_1.SchemaFactory.createForClass(Logs);
exports.LOGS_MODEL = Logs.name;
//# sourceMappingURL=log.schema.js.map