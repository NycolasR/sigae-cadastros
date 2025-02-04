import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarEmail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const existeEmail = !!email;
    const emailFormatoInvalido = !regex.test(email);
    return existeEmail && emailFormatoInvalido ? { emailInvalido: true } : null;
  };
}
