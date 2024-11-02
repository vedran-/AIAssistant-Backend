import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File): Promise<import("./entities/file.entity").File>;
    getFile(id: string): Promise<import("./entities/file.entity").File>;
}
