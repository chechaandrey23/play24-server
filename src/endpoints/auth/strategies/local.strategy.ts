import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, Inject, Body, UsePipes, ValidationPipe} from '@nestjs/common';
import {BadRequestException} from '@nestjs/common';
import {validate, validateOrReject} from 'class-validator';

import {MediaryUsersService} from '../../../mediaries/auth/users/mediary.users.service';

import {User, UserDocument} from '../../../entries/users/user.model';

import {
	ExpressUserAccessToken, ExpressUserRefreshToken,
} from './strategies.interface';

import {LoginDTO} from '../auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private mediaryUsersService: MediaryUsersService) {
		super();
	}

	public async validate(username: string, password: string): Promise<ExpressUserAccessToken> {
		const loginDTO: LoginDTO = new LoginDTO();
		loginDTO.username = username;
		loginDTO.password = password;

		const errors = await validate(loginDTO);
		if(errors.length > 0) {
			throw new BadRequestException(errors.reduce((acc, entry) => {
				acc.push(...Object.keys(entry.constraints).map((key) => {
					return entry.constraints[key];
				}))
				return acc;
			}, []));
		}

		const user: UserDocument = await this.mediaryUsersService.checkUser({
			username: loginDTO.username,
			password: loginDTO.password,
		});

		return {
			id: user.id,
			roles: user.roles.map((entry) => (entry.role)),
		};
	}
}
