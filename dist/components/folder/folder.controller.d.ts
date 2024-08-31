import { FolderService } from './folder.service';
import { CreateFolderDTO } from './dto/createFolder.dto';
export declare class FolderController {
    private readonly folderService;
    constructor(folderService: FolderService);
    createFolder(createFolderDTO: CreateFolderDTO): Promise<{
        message: string;
    }>;
    getAllFolder(bodyData: any): Promise<any>;
    findAllSubFolder(bodyData: any): Promise<any>;
    deleteSpecificFolder(id: any): Promise<any>;
    getFolderById(id: string): Promise<any>;
    updateFolderById(id: string, folderName: string): Promise<any>;
}
