"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPassword = void 0;
function generateRandomPassword() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}
exports.generateRandomPassword = generateRandomPassword;
//# sourceMappingURL=generatePassword.js.map