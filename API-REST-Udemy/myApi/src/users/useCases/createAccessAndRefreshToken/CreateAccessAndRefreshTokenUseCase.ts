import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/utils/errors/AppErro";
import { User } from "@users/entities/User";
import { IRefreshTokenRepository } from "@users/repositories/IRefreshTokenRepository";
import { IUserRepository } from "@users/repositories/IUserRepository";
import jwtConfig from '@config/auth';

type CreateAccessAndRefreshTokenDTO = {
    user_id: string
    refresh_token: string
}

type IResponse = {
    user: User,
    accessToken: string,
    refreshToken: string
}


@injectable()
export class CreateAccessAndRefreshTokenUseCase {
    constructor(
        @inject('UserRepository') private usersRepository: IUserRepository,
        @inject('RefreshTokenRepository') private refreshTokenRepository: IRefreshTokenRepository,
    ) { }

    public async execute({
        user_id,
        refresh_token
    }: CreateAccessAndRefreshTokenDTO): Promise<IResponse> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.', 404)
        }

        const refreshTokenExist = await this.refreshTokenRepository.findByToken(refresh_token)

        if (!refreshTokenExist) {
            throw new AppError('refresh token is required.', 401)
        }

        const dateNow = new Date().getTime()

        if (
            !refreshTokenExist.valid ||
            refreshTokenExist.expires.getTime() <
            dateNow
        ) {
            throw new AppError('refresh token is invalid/expired.', 401)
        }

        await this.refreshTokenRepository.invalidate(refreshTokenExist)

        const accessToken = sign(
            { sub: user.id },
            jwtConfig.jwt.secret as string
        );

        const expires = new Date(Date.now() + jwtConfig.refreshToken.duration);

        const refreshToken = sign(
            { sub: user.id },
            jwtConfig.refreshToken.secret as string,
        );

        await this.refreshTokenRepository.create({
            user_id: user.id,
            token: refreshToken,
            expires,
            valid: true
        })

        return {
            user,
            accessToken,
            refreshToken
        }
    }
}