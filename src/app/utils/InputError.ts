export class InputError<T> {
  value: T | null;
  hasError: boolean;
  actualError: string;
  errorsDescription: any;
  private fieldsParameters: any;

  constructor() {
    this.value = null;
    this.hasError = true;
    this.actualError = '';
    this.errorsDescription = {};
    this.fieldsParameters = {};
  }

  setErrorParameter(key: string, value: any) {
    this.fieldsParameters[key] = value;
  }

  public getFirstErrorDescription(): string {
    const posibleErrors: string[] = Object.keys(this.errorsDescription);
    for (let i = 0; i < posibleErrors.length; i++) {
      let error: string = posibleErrors[i];
      const errorFunction: string =
        'compliesWith' + error.charAt(0).toUpperCase() + error.slice(1);
      if (!this[errorFunction as keyof InputError<any>]()) {
        return this.errorsDescription[error];
      }
    }
    return '';
  }

  private compliesWithRequired(): boolean {
    return this.value !== null && this.value !== undefined;
  }

  private compliesWithMinLength(): boolean | Error {
    if (this.fieldsParameters.minLength) {
      if (typeof this.value === 'string') {
        return this.value.length >= this.fieldsParameters.minLength;
      }
      return false;
    }
    throw new Error('No minLength parameter set');
  }

  private compliesWithMaxLength(): boolean | Error {
    if (this.fieldsParameters.maxLength) {
      if (typeof this.value === 'string') {
        return this.value.length <= this.fieldsParameters.maxLength;
      }
      return false;
    }
    throw new Error('No maxLength parameter set');
  }

  private compliesWithPattern(): boolean | Error {
    if (this.fieldsParameters.pattern) {
      return this.fieldsParameters.pattern.test(this.value);
    }
    throw new Error('No pattern parameter set');
  }

  private compliesWithMax(): boolean {
    if (this.fieldsParameters.max) {
      if (typeof this.value === 'number') {
        return this.value <= this.fieldsParameters.max;
      }
      return false;
    }
    throw new Error('No max parameter set');
  }

  private compliesWithMin(): boolean | Error {
    if (this.fieldsParameters.min) {
      if (typeof this.value === 'number') {
        return this.value >= this.fieldsParameters.min;
      }
      return false;
    }
    throw new Error('No min parameter set');
  }

  private compliesWithMatch(): boolean | Error {
    if (this.fieldsParameters.match) {
      return this.value === this.fieldsParameters.match;
    }
    throw new Error('No match parameter set');
  }

  private compliesWithEmail(): boolean | Error {
    try {
      if (typeof this.value === 'string') {
        return this.value.includes('@') && this.value.includes('.');
      }
      return false;
    } catch (error) {
      throw new Error('The email value is not a string');
    }
  }

  public getValue(): T | null {
    return this.value;
  }
}
