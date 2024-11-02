import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
export declare class FilesService {
    private fileRepository;
    private readonly uploadDir;
    constructor(fileRepository: Repository<File>);
    saveFile(file: Express.Multer.File): Promise<File>;
    getFile(id: string): Promise<File>;
}
