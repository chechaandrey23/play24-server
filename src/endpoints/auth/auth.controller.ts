import {Body, Controller, Get, Post, Param, Query, Req, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';

import {AuthService} from './auth.service';

import {
  LoginDTO, LogoutDTO, RegistrationDTO,
} from './auth.dto';

import {JWTAccessAuthGuard} from './guards/jwt.access.auth.guard';
import {JWTRefreshAuthGuard} from './guards/jwt.refresh.auth.guard';
import {LocalAuthGuard} from './guards/local.auth.guard';

import {UserRoleGuard} from './guards/user.role.guard';
import {AdminRoleGuard} from './guards/admin.role.guard';

import {User, UserDocument} from '../../entries/users/user.model';
import {Role, RoleDocument} from '../../entries/roles/role.model';

import {
  ExpressUser, ExpressUserAccessToken, ExpressUserRefreshToken,
} from './strategies/strategies.interface';

@UsePipes(new ValidationPipe({transform: true}))
@Controller('auth/api')
export class AuthController {
	constructor(
		private authService: AuthService,
	) {}
  /*
  @Get('/server-time-zone')
  public async getServerTimeZone(): Promise<number> {
    return (new Date()).getTimezoneOffset()/60;
  }
  */
	@UseGuards(LocalAuthGuard)
	@Post('/login')
	public async logIn(@Req() req: Request): Promise<UserDocument> {
		return await this.authService.login(req, {
			userId: (req.user as ExpressUser).id,
			userAgent: req.headers['user-agent'],
			ip: req.clientIp,
		});
	}

	@UseGuards(JWTRefreshAuthGuard)
	@Post('/logout')
	public async logOut(@Req() req: Request, @Body() logoutDTO: LogoutDTO): Promise<any> {
		return await this.authService.logout(req, {
			userId: (req.user as ExpressUserAccessToken)?.id,
      refreshTokenId: (req.user as ExpressUserRefreshToken)?.refreshTokenId,
			fullExit: logoutDTO.fullExit,
			//userAgent: req.headers['user-agent'],
			//ip: req.clientIp,
		});
	}

  @Get('/roles')
  public async getRoles(@Req() req: Request): Promise<Array<RoleDocument>> {
    return await this.authService.getRoles(req, {});
  }

  @UseGuards(JWTAccessAuthGuard)
  @Get('/user')
  public async getUser(@Req() req: Request): Promise<UserDocument|null> {
    return await this.authService.getUser(req, {
      userId: (req.user as ExpressUserAccessToken)?.id,
    });
  }

  @Post('/registration')
	public async registration(@Req() req: Request, @Body() registrationDTO: RegistrationDTO): Promise<UserDocument> {
		return await this.authService.registration(req, {
			username: registrationDTO.username,
      password: registrationDTO.password,
      roles: registrationDTO.roles,
			userAgent: req.headers['user-agent'],
			ip: req.clientIp,
		});
	}

	@UseGuards(JWTRefreshAuthGuard)
	@Post('/refresh')
	public async refresh(@Req() req: Request): Promise<UserDocument> {
		const user = req.user as ExpressUserRefreshToken;
		return await this.authService.refresh(req, {
			userId: user.id,
			refreshTokenId: user.refreshTokenId,
			userAgent: req.headers['user-agent'],
			ip: req.clientIp,
		});
	}
}
