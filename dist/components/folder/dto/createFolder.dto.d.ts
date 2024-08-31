export declare class CreateFolderDTO {
    readonly folderName: string;
    readonly nextFolderID: string;
    readonly prevFolderID: string;
    readonly createdBy: string;
    readonly files: [{
        fileName: string;
        filePath: string;
    }];
}
