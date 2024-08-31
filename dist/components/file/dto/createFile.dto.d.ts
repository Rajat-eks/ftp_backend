import { User } from 'src/Schema/auth/auth.schema';
export declare class CreateFileDTO {
    readonly dateAndTime: any;
    readonly files: any[];
    readonly currenFolderID: string;
    readonly user: User;
    readonly userEmail: string;
}
