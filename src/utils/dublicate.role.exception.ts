import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';

export default class DublicateRoleException extends ConflictException {}
