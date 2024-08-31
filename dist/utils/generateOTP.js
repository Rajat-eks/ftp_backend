"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
function generateOTP() {
    const characters = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        OTP += characters.charAt(randomIndex);
    }
    return OTP;
}
exports.generateOTP = generateOTP;
//# sourceMappingURL=generateOTP.js.map