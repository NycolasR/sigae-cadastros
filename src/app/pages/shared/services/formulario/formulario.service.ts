import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  constructor() {}

  formularioIsValido(form: FormGroup): boolean {
    form.markAllAsTouched();
    return form.valid;
  }
}
