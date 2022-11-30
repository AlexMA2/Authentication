export class InputError {
  value: any;
  hasError: boolean;
  actualError: string;
  errorsDescription: any;
  private errorsParameters: any;

  constructor() {
    this.value = '';
    this.hasError = true;
    this.actualError = '';
    this.errorsDescription = {};
    this.errorsParameters = {};
  }

  setErrorParameter(key: string, value: any) {
    this.errorsParameters[key] = value;
  }

  public compliesWithAll(): string {
    const posibleErrors: string[] = Object.keys(this.errorsDescription);
    for (let i = 0; i < posibleErrors.length; i++) {
      let error: string = posibleErrors[i];
      const errorFunction: string =
        'compliesWith' + error.charAt(0).toUpperCase() + error.slice(1);
      if (!this[errorFunction as keyof InputError]()) {
        return this.errorsDescription[error];
      }
    }
    return '';
  }

  private compliesWithRequired(): boolean {
    return this.value !== '';
  }

  private compliesWithMinLength(): boolean | Error {
    if (this.errorsParameters.minLength) {
      return this.value.length >= this.errorsParameters.minLength;
    }
    throw new Error('No minLength parameter set');
  }

  private compliesWithMaxLength(): boolean | Error {
    if (this.errorsParameters.maxLength) {
      return this.value.length <= this.errorsParameters.maxLength;
    }
    throw new Error('No maxLength parameter set');
  }

  private compliesWithPattern(): boolean | Error {
    if (this.errorsParameters.pattern) {
      return this.errorsParameters.pattern.test(this.value);
    }
    throw new Error('No pattern parameter set');
  }

  private compliesWithMax(): boolean {
    if (this.errorsParameters.max) {
      return this.value <= this.errorsParameters.max;
    }
    throw new Error('No max parameter set');
  }

  private compliesWithMin(): boolean | Error {
    if (this.errorsParameters.min) {
      return this.value >= this.errorsParameters.min;
    }
    throw new Error('No min parameter set');
  }

  private compliesWithMatch(): boolean | Error {
    if (this.errorsParameters.match) {
      return this.value === this.errorsParameters.match;
    }
    throw new Error('No match parameter set');
  }

  private compliesWithEmail(): boolean | Error {
    try {
      return this.value.includes('@') && this.value.includes('.');
    } catch (error) {
      throw new Error('The email value is not a string');
    }
  }

  public getValue(): any {
    return this.value;
  }
}
