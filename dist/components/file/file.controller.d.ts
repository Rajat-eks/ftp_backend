import { FileService } from './file.service';
import { CreateFileDTO } from './dto/createFile.dto';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    createFile(createFileDTO: CreateFileDTO): Promise<{
        message: string;
    }>;
    getAllFilesFromFolder(folderID: string): Promise<{
        files: [any];
    }>;
    deleteFileFromFiles(bodyData: any): Promise<{
        message: string;
    }>;
}
