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
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
let CryptoService = class CryptoService {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.key = crypto.scryptSync('your-secret-key', 'salt', 32);
    }
    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + encrypted;
    }
    decrypt(encryptedText) {
        try {
            const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
            const encryptedData = encryptedText.slice(32);
            const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
            decrypted += decipher.final('utf-8');
            return decrypted;
        }
        catch (error) {
            console.error('Decryption error:', error);
            console.error('Encrypted text:', encryptedText);
            throw new Error('Failed to decrypt');
        }
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CryptoService);
//# sourceMappingURL=crypto.service.js.map