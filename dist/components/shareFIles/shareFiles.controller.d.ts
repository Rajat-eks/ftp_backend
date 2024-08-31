import { ShareFileService } from './shareFiles.service';
import { ShareFileDTO } from './dto/shareFile.dto';
import { Request } from 'express';
export declare class ShareFileController {
    private readonly shareFileService;
    constructor(shareFileService: ShareFileService);
    shareFile(shareFileDTO: ShareFileDTO, request: Request): any;
    verifyFile(token: string): any;
    verifyOTP(token: string): any;
    checkOTPSecurity(token: string): any;
    getOTP(token: string): any;
}
