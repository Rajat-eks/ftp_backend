import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key: Buffer;

  constructor() {
    // Replace 'your-secret-key' with a strong secret key or generate one securely
    this.key = crypto.scryptSync('your-secret-key', 'salt', 32);
  }

  encrypt(text: any): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
  }

  decrypt(encryptedText: string): string {
    try {
      const iv = Buffer.from(encryptedText.slice(0, 32), 'hex');
      const encryptedData = encryptedText.slice(32);

      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
      let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
      decrypted += decipher.final('utf-8');
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      console.error('Encrypted text:', encryptedText);
      throw new Error('Failed to decrypt');
    }
  }
}
