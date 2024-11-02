import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private readonly uploadDir = 'uploads';

  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<File> {
    const filename = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, filename);

    // Save file to disk
    fs.writeFileSync(filePath, file.buffer);

    // Save file metadata to database
    const fileEntity = this.fileRepository.create({
      filename: file.originalname,
      path: filePath,
      mimeType: file.mimetype,
      size: file.size,
    });

    return this.fileRepository.save(fileEntity);
  }

  async getFile(id: string): Promise<File> {
    const file = await this.fileRepository.findOne({ where: { id } });
    if (!file) {
      throw new NotFoundException(`File with ID ${id} not found`);
    }
    return file;
  }
}