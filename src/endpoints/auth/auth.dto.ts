import {IsInt, IsNotEmpty, Min, Max, MinLength, MaxLength, IsNumberString, ArrayNotEmpty,
        IsString, IsArray, IsBoolean, IsEmail, ValidateIf, ValidateNested,
        IsPhoneNumber, IsMongoId} from 'class-validator';
import {Transform, Type} from 'class-transformer';

export class LoginDTO {
	@MinLength(5)
	@MaxLength(50)
	@IsNotEmpty()
	@IsString()
	username: string;

	@MinLength(6)
	@MaxLength(50)
	@IsNotEmpty()
	@IsString()
	password: string;
}

export class LogoutDTO {
	@Transform(({value}) => {return !!value})
	@IsBoolean()
	fullExit: boolean;
}

export class RegistrationDTO {
  @MinLength(5)
	@MaxLength(50)
	@IsNotEmpty()
	@IsString()
	username: string;

	@MinLength(6)
	@MaxLength(50)
	@IsNotEmpty()
	@IsString()
	password: string;

  @Transform(({value}) => {return value.map((val) => {return val+''})})
  @IsMongoId({each: true})
  @IsArray()
  @ArrayNotEmpty()
  roles: Array<string>
}
