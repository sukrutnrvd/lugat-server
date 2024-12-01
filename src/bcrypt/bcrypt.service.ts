import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptService {
  private async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(10);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await this.generateSalt();
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
