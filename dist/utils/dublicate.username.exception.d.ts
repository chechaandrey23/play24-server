import { ConflictException } from '@nestjs/common';
export default class DublicateUsernameException extends ConflictException {
}
