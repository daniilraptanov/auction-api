import bcrypt from "bcryptjs";

export class CryptoService {
  static async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  static async checkPasswordHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
