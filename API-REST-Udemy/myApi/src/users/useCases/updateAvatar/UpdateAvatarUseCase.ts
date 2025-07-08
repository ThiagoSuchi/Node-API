import { inject, injectable } from "tsyringe";
import path from "path";
import fs from "fs";

import { AppError } from "@shared/utils/errors/AppErro";
import { User } from "@users/entities/User";
import { IUserRepository } from "@users/repositories/IUserRepository";
import uploadConfig from '@config/upload';

export type UpdateAvatarDTO = {
  userId: string
  avatarFileName: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
  ) {}

  async execute({ avatarFileName, userId }:  UpdateAvatarDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    // Verificação da existência de um avatar anterior para removê-lo
    if (user.avatar) {
      try {
        // após verificar a existência do avatar, ele será apagado
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
        await fs.promises.stat(userAvatarFilePath); // Verifica se existe
        await fs.promises.unlink(userAvatarFilePath); // Remove o arquivo
      } catch (error) {
        // Se o arquivo não existir, apenas continua (não é um erro crítico)
        console.log('Avatar anterior não encontrado, continuando...');
      }
    }

    // salva o novo avatar
    user.avatar = avatarFileName;
    return this.usersRepository.save(user);
  }
}
