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
import mongoose from 'mongoose';
export type ShareFileDocument = ShareFile & Document;
export declare class ShareFile {
    folderID: string;
    file: any;
    token: string;
    shareBy: string;
    shareTo: string[];
    isFolderShare: boolean;
    isFileShare: boolean;
    OTPSecurity: boolean;
    OTP: string;
}
export declare const ShareFileSchema: mongoose.Schema<ShareFile, mongoose.Model<ShareFile, any, any, any, mongoose.Document<unknown, any, ShareFile> & ShareFile & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ShareFile, mongoose.Document<unknown, {}, mongoose.FlatRecord<ShareFile>> & mongoose.FlatRecord<ShareFile> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const SHAREFILE_MODEL: string;
