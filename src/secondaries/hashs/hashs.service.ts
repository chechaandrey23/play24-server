import {Injectable} from '@nestjs/common';
import {NotImplementedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
// import * as bcrypt from 'bcrypt'

import {SaltInterface, SaltsInterface} from '../../configs/salts.config';

@Injectable()
export class HashsService {
	constructor(private configService: ConfigService) {
    const salts = this.configService.get('salts.names');

    Object.keys(salts).forEach((key) => {
      Object.defineProperty(
        HashsService,
        'SALT_'+salts[key],
        {value: salts[key], writable: false},
      );
    });
  }

  public async getSalt(salt: string): Promise<SaltInterface> {
    const salts: SaltsInterface = this.configService.get('salts.salts');
    if(!salts.hasOwnProperty(salt)) {
      throw new NotImplementedException(`Salt with name "${salt}" does not exist`);
    }
    return salts[salt];
  }

	public async toHash(saltName: string, password: string): Promise<string> {
    const salt: SaltInterface = await this.getSalt(saltName);
		return await bcrypt.hash(salt.secretStart + password + salt.secretEnd, salt.rounds);
	}

	public async compareHashSample(saltName: string, hash: string, clientPassword: string): Promise<boolean> {
    const salt: SaltInterface = await this.getSalt(saltName);
		return await bcrypt.compare(salt.secretStart + clientPassword + salt.secretEnd, hash);
	}
}
