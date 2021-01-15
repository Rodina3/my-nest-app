import { ValidationError } from 'class-validator/types/validation/ValidationError';

export class ValidationException extends Error {
  readonly errors;

  constructor(validationErrors: ValidationError[]) {
    super('Bad Request Exception');

    this.errors = validationErrors.map((it) => ({
      pointer: it.property,
      message: Object.values(it.constraints)[0],
    }));
  }
}
