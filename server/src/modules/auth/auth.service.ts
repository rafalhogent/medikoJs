import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, Tokens } from './models/auth.types';
import { JwtPayload } from './models/jwtPayload.type';
import { jwtConstants } from './constants';
import { RefreshToken } from './models/refresh-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import ms, { StringValue } from 'ms';
import { extractToken } from './helpers/auth.helper';
// import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly tokenRepo: Repository<RefreshToken>,
  ) {}

  async login(
    username: string,
    pass: string,
    clientId?: string,
  ): Promise<AuthResponse> {
    const user = await this.usersService.findOne(username);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const newCLientId = clientId?.length ? clientId : this.generateClientId();
    const newTokens = await this.generateTokens(user.id, username, newCLientId);
    await this.updateRefreshTokenHash(
      user.id,
      newCLientId,
      newTokens.refresh_token,
    );

    return {...newTokens, user: user.name};
  }

  async register(username: string, pass: string): Promise<Tokens> {
    if (!username?.length || !pass?.length)
      throw new BadRequestException('Invalid credentials');

    const user = await this.usersService.findOne(username);
    if (user)
      throw new BadRequestException('User with same name already exists');

    const hash = await bcrypt.hash(pass, 10);
    const res = await this.usersService.create(username, hash);

    const clientId = this.generateClientId();
    const tokens = await this.generateTokens(res.id, res.name, clientId);
    await this.updateRefreshTokenHash(res.id, clientId, tokens.refresh_token);

    return tokens;
  }

  async refreshTokens(sentTokenHeader: string) {
    const sentRefreshToken = extractToken(sentTokenHeader).token_value;

    let jwt: JwtPayload;
    try {
      jwt = await this.jwtService.verifyAsync(sentRefreshToken, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = await this.usersService.findById(jwt.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    let tokenEntity = await this.tokenRepo.findOne({
      where: {
        userId: user.id,
        clientId: jwt.clientId,
      },
    });

    if (
      !jwt ||
      !tokenEntity ||
      !(await bcrypt.compare(sentRefreshToken, tokenEntity?.value))
    ) {
      throw new UnauthorizedException();
    }

    const newTokens = await this.generateTokens(
      user.id,
      user.name,
      jwt.clientId,
    );
    return newTokens;
  }

  //#region private methods
  private async updateRefreshTokenHash(
    userId: number,
    clientId: string,
    newToken: string,
  ) {
    let rt = await this.tokenRepo.findOne({
      where: {
        userId: userId,
        clientId: clientId,
      },
    });

    if (!rt) {
      rt = new RefreshToken();
      rt.userId = userId;
      rt.clientId = clientId;
    }

    rt.value = await bcrypt.hash(newToken, 10);

    try {
      rt.expires_at = new Date(
        new Date().getTime() + ms(jwtConstants.refresTokenExp as StringValue),
      );
    } catch (error) {
      throw new Error('Server error: Invalid App config');
    }

    try {
      const res = await this.tokenRepo.save(rt);
      return res;
    } catch (error) {
      throw new Error('Could not save token');
    }
  }

  private async generateTokens(
    userId: number,
    username: string,
    clientId: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      username: username,
      clientId: clientId,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: jwtConstants.accessTokenExp,
      }),
      this.jwtService.signAsync(jwtPayload, {
        expiresIn: jwtConstants.refresTokenExp,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  private generateClientId() {
    return crypto.randomUUID();
  }
  //#endregion
}
