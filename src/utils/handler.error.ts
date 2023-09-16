import {HttpException, HttpStatus, ConflictException, NotAcceptableException, InternalServerErrorException} from '@nestjs/common';

export function handlerError(e: Error, data: object = {}): void {
	console.error(e);
	if(e instanceof HttpException) {
		throw e;
	} else {
		throw new InternalServerErrorException({...data, ...{reason: e.toString()}});
	}
}
