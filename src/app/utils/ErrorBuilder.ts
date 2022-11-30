import { InputError } from 'src/app/utils/InputError';
export class ErrorBuilder {
  private inputError: InputError;
  private key: string;
  constructor(key: string) {
    this.key = key;
    this.inputError = new InputError();
  }

  public build(): any {
    return this.inputError;
  }

  public required(): any {
    this.inputError.errorsDescription.required = this.key + ' is required';
    return this;
  }

  public minLength(minLength: number): any {
    this.inputError.setErrorParameter('minLength', minLength);
    this.inputError.errorsDescription.minLength =
      this.key + ' should be at least ' + minLength + ' characters';
    return this;
  }

  public maxLength(maxLength: number): any {
    this.inputError.setErrorParameter('maxLength', maxLength);
    this.inputError.errorsDescription.maxLength =
      this.key + ' should not be more than ' + maxLength + ' characters';
    return this;
  }

  public pattern(pattern: string, message: string): any {
    this.inputError.setErrorParameter('pattern', pattern);
    this.inputError.errorsDescription.pattern = message;
    return this;
  }

  public max(max: number): any {
    this.inputError.setErrorParameter('max', max);
    this.inputError.errorsDescription.max =
      this.key + ' should be lower than ' + max;
    return this;
  }

  public min(min: number): any {
    this.inputError.setErrorParameter('min', min);
    this.inputError.errorsDescription.min =
      this.key + ' should be greater than ' + min;
    return this;
  }

  public match(comparator: string): any {
    this.inputError.setErrorParameter('match', comparator);
    this.inputError.errorsDescription.match =
      this.key + ' and ' + comparator + ' are not the same';
    return this;
  }

  public email(): any {
    this.inputError.errorsDescription.email = 'Email is not valid';
    return this;
  }
}
