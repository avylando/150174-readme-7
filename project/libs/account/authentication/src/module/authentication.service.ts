import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  BlogUserEntity,
  BlogUserFactory,
  BlogUserRepository,
} from '@project/blog-user';
import { AccountNotifyService } from '@project/account-notify';

import { LoginUserDto } from '../dto/login-user.dto';
import { AuthError } from './authentication.constants';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  AuthTokens,
  createJWTPayload,
  createRefreshJWTPayload,
  User,
} from '@avylando-readme/core';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { accountJwtConfig } from '@project/account-config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Injectable()
export class AuthenticationService {
  private logger = new Logger(AuthenticationService.name);

  constructor(
    protected readonly blogUserRepository: BlogUserRepository,
    protected readonly blogUserFactory: BlogUserFactory,
    protected readonly jwtService: JwtService,
    protected readonly notifyService: AccountNotifyService,
    protected readonly refreshTokenService: RefreshTokenService,
    @Inject(accountJwtConfig.KEY)
    protected readonly jwtOptions: ConfigType<typeof accountJwtConfig>
  ) {}

  public async login(dto: LoginUserDto): Promise<BlogUserEntity> {
    const { email, password } = dto;
    const user = await this.blogUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    if (!(await user.comparePassword(password))) {
      throw new UnauthorizedException(AuthError.PASSWORD_WRONG);
    }

    return user;
  }

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const existedUser = await this.blogUserRepository.findByEmail(dto.email);

    if (existedUser) {
      throw new ConflictException(AuthError.USER_EXISTS);
    }
    const user = await this.blogUserFactory
      .create({
        ...dto,
        role: 'user',
      })
      .setPassword(dto.password);

    const createdUser = await this.blogUserRepository.save(user);
    await this.notifyService.registerSubscriber(createdUser.toPlainObject());

    return user;
  }

  public async findUser(id: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    return user;
  }

  public async findUserByEmail(email: string): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    return user;
  }

  public async updateUser(
    id: string,
    dto: UpdateUserDto
  ): Promise<BlogUserEntity> {
    const user = await this.blogUserRepository.update({ id, ...dto });

    return user;
  }

  public async initUserAvatar(
    id: string,
    dto: UpdateUserDto
  ): Promise<BlogUserEntity> {
    if (!dto.avatarSrc) {
      throw new BadRequestException('Avatar source is required');
    }

    const user = await this.blogUserRepository.findById(id);
    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    if (user.avatarSrc) {
      throw new ConflictException('User already has an avatar');
    }

    const updatedUser = await this.updateUser(id, {
      avatarSrc: dto.avatarSrc,
    });
    return updatedUser;
  }

  public async createUserToken(user: User): Promise<AuthTokens> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = createRefreshJWTPayload(user);

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: this.jwtOptions.accessTokenExpiration,
        secret: this.jwtOptions.accessTokenSecret,
      });
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          expiresIn: this.jwtOptions.refreshTokenExpiration,
          secret: this.jwtOptions.refreshTokenSecret,
        }
      );
      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async verifyRefreshToken(
    token: string
  ): Promise<BlogUserEntity | null> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.jwtOptions.refreshTokenSecret,
    });

    if (!payload) {
      return null;
    }

    const user = await this.blogUserRepository.findById(payload.sub);

    if (!user) {
      throw new NotFoundException(AuthError.NOT_FOUND);
    }

    return user;
  }
}
