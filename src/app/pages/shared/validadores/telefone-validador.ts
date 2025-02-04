import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarTelefone(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!control.value) {
      return null;
    }

    const isValid = telefoneRegex.test(control.value);
    return isValid ? null : { telefoneInvalido: true };
  };
}
