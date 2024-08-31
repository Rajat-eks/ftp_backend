/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ShareFileDTO } from './dto/shareFile.dto';
import { ShareFileDocument } from 'src/Schema/shareFile/shareFile.schema';
import { Model } from 'mongoose';
import { CryptoService } from './crypto.service';
import { FolderDocument } from 'src/Schema/folder/folder.schema';
import { LogsDocument } from 'src/Schema/log/log.schema';
export declare class ShareFileService {
    private readonly shareFileModel;
    private readonly folderModel;
    private readonly cryptoService;
    private readonly logsModel;
    constructor(shareFileModel: Model<ShareFileDocument>, folderModel: Model<FolderDocument>, cryptoService: CryptoService, logsModel: Model<LogsDocument>);
    shareFile(shareFileDTO: ShareFileDTO, ipAddress: any): Promise<{
        message: string;
    }>;
    verifyFile(token: string): Promise<any>;
    verifyOTP(token: string): Promise<any>;
    checkOTPSecurity(token: string): Promise<any>;
    getOTP(token: string): Promise<any>;
}
