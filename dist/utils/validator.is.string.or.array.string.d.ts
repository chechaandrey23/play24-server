import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsStringOrArrayString implements ValidatorConstraintInterface {
    validate(data: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
