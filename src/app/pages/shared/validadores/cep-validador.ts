import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarCep(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cepRegex = /^\d{5}-\d{3}$/;

    if (!control.value) {
      return null;
    }

    const isValid = cepRegex.test(control.value);
    return isValid ? null : { cepInvalido: true };
  };
}
