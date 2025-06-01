import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileAccessor {
  filePath: string;
}

@Injectable()
export class FileService<I> {
  private readonly filePath: string;

  constructor(filePath?: string) {
    if (filePath) {
      this.filePath = path.resolve(filePath);
      console.log('\n=== FileService Initialization ===');
      console.log('Absolute path:', this.filePath);
      console.log('File exists before init:', fs.existsSync(this.filePath));
      this.ensureFileExists();
      console.log('File exists after init:', fs.existsSync(this.filePath));
      if (fs.existsSync(this.filePath)) {
        const content = fs.readFileSync(this.filePath, 'utf8');
        console.log('Initial file content:', content);
      }
      console.log('===============================\n');
    } else {
      throw new Error('File path must be provided');
    }
  }

  private ensureFileExists(): void {
    const dir = path.dirname(this.filePath);
    console.log('\n=== Ensuring File Exists ===');
    console.log('Directory path:', dir);
    console.log('Directory exists:', fs.existsSync(dir));
    
    if (!fs.existsSync(dir)) {
      console.log('Creating directory...');
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(this.filePath)) {
      console.log('Creating file...');
      fs.writeFileSync(this.filePath, '[]', 'utf8');
    }
    console.log('File exists now:', fs.existsSync(this.filePath));
    console.log('==========================\n');
  }

  public read<T extends I>(): T {
    console.log('\n=== Reading File ===');
    console.log('Reading from:', this.filePath);
    this.ensureFileExists();
    const data = fs.readFileSync(this.filePath, 'utf8');
    console.log('Read data:', data);
    console.log('===================\n');
    try {
      return JSON.parse(data) as T;
    } catch (e) {
      console.error('Error parsing JSON from file:', e);
      return [] as T;
    }
  }

  public add<T>(newData: T): void {
    console.log('\n=== Adding Data ===');
    console.log('New data to add:', JSON.stringify(newData));
    const data = this.read();
    if (Array.isArray(data)) {
      data.push(newData);
      console.log('Updated data array:', JSON.stringify(data));
    }
    this.write(data);
    console.log('=================\n');
  }

  public write<T extends I>(data: T): void {
    console.log('\n=== Writing File ===');
    console.log('Writing to:', this.filePath);
    console.log('Data to write:', JSON.stringify(data));
    this.ensureFileExists();
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log('Write successful');
      const verification = fs.readFileSync(this.filePath, 'utf8');
      console.log('Verification - file content after write:', verification);
    } catch (e) {
      console.error('Error writing to file:', e);
      throw e;
    }
    console.log('===================\n');
  }
}