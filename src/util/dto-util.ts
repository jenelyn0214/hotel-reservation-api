import { ForbiddenException } from '@nestjs/common';
export function parseBoolean(
  value: string | boolean,
  propertyName: string,
): boolean {
  if (typeof value === 'string') {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else {
      throw new ForbiddenException(
        `${propertyName} must be either true or false`,
      );
    }
  } else {
    return value;
  }
}

export function toPlainObject<T>(mongooseObj: any): T {
  return Object.assign({}, mongooseObj.toJSON());
}
