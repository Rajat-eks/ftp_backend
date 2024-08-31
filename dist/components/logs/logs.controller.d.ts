import { LogsService } from './logs.service';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    getAllLogs(): Promise<any[]>;
    findLog(id: string): Promise<any>;
}
