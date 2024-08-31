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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export type LogsDocument = Logs & Document;
export declare class Logs {
    userEmail: string;
    ip: string;
    files: any[];
    folder: string;
    senderEmail: string[];
    isDomainSame: boolean;
    isFileShare: boolean;
    isFolderShare: boolean;
}
export declare const LogsSchema: import("mongoose").Schema<Logs, import("mongoose").Model<Logs, any, any, any, import("mongoose").Document<unknown, any, Logs> & Logs & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Logs, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Logs>> & import("mongoose").FlatRecord<Logs> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const LOGS_MODEL: string;
