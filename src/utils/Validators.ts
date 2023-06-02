import bcrypt from "bcrypt";

class Validators {
  public validateCPF(cpf: string): boolean {
    const cleanedCPF = cpf.replace(/\D/g, "");

    if (cleanedCPF.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cleanedCPF)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    let mod = sum % 11;
    const digit1 = mod < 2 ? 0 : 11 - mod;

    if (parseInt(cleanedCPF.charAt(9)) !== digit1) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    mod = sum % 11;
    const digit2 = mod < 2 ? 0 : 11 - mod;

    if (parseInt(cleanedCPF.charAt(10)) !== digit2) {
      return false;
    }

    return true;
  }

  public async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error("Erro ao criptografar senha");
    }
  }
}

export default new Validators();
