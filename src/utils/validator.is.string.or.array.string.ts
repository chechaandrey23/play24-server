import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from 'class-validator';

@ValidatorConstraint({ name: 'string-or-array-string', async: false })
export class IsStringOrArrayString implements ValidatorConstraintInterface {
  validate(data: any, args: ValidationArguments) {
    return (Array.isArray(data) && data.filter((item) => (typeof item === 'string')).length === data.length) || typeof data === 'string';
  }

  defaultMessage(args: ValidationArguments) {
    return '($value) must be string or Array<string>';
  }
}
