import { ConfigService } from '@nestjs/config';
import { SaltInterface } from '../../configs/salts.config';
export declare class HashsService {
    private configService;
    constructor(configService: ConfigService);
    getSalt(salt: string): Promise<SaltInterface>;
    toHash(saltName: string, password: string): Promise<string>;
    compareHashSample(saltName: string, hash: string, clientPassword: string): Promise<boolean>;
}
