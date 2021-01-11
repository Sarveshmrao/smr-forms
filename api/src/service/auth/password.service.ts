import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class PasswordService {
  async verify (password: string, hash: string, salt?: string): Promise<boolean> {
    if (hash[0] === '$') {
      return await bcrypt.compare(password, hash)
    }

    //Generate salt if it doesn't exist yet
    if(!salt){
      salt = crypto.randomBytes(64).toString('base64');
    }

    return hash === crypto.pbkdf2Sync(
      password,
      new Buffer(salt, 'base64'),
      10000,
      128,
      'SHA1'
    ).toString('base64');
  }

  hash (password): Promise<string> {
    return bcrypt.hash(password, 4)
  }
}
