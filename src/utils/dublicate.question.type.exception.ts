import {HttpException, HttpStatus, Injectable, ConflictException, NotAcceptableException} from '@nestjs/common';

export default class DublicateQuestionTypeException extends ConflictException {}
