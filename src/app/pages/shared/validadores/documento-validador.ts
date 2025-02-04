import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validarCPF(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validarDocumento(control, 'CPF');
  };
}

export function validarCNPJ(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validarDocumento(control, 'CNPJ');
  };
}

function validarDocumento(
  control: AbstractControl,
  tipo: 'CPF' | 'CNPJ'
): ValidationErrors | null {
  const documento = control.value?.replace(/\D/g, '');
  const tamanhoEsperado = tipo === 'CPF' ? 11 : 14;

  if (
    !documento ||
    documento.length !== tamanhoEsperado ||
    /^(\d)\1+$/.test(documento)
  ) {
    return { documentoInvalido: true };
  }

  return tipo === 'CPF'
    ? validarCPFRegra(documento)
    : validarCNPJRegra(documento);
}

function validarCPFRegra(cpf: string): ValidationErrors | null {
  const calcularDigito = (base: string, pesoInicial: number): number => {
    const soma = base
      .split('')
      .map((num, index) => parseInt(num) * (pesoInicial - index))
      .reduce((acc, curr) => acc + curr, 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base = cpf.slice(0, 9);
  const digito1 = calcularDigito(base, 10);
  const digito2 = calcularDigito(base + digito1, 11);

  return cpf.endsWith(`${digito1}${digito2}`)
    ? null
    : { documentoInvalido: true };
}

function validarCNPJRegra(cnpj: string): ValidationErrors | null {
  const calcularDigito = (base: string, pesos: number[]): number => {
    const soma = base
      .split('')
      .map((num, index) => parseInt(num) * pesos[index])
      .reduce((acc, curr) => acc + curr, 0);

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const base = cnpj.slice(0, 12);
  const pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const digito1 = calcularDigito(base, pesosPrimeiroDigito);
  const digito2 = calcularDigito(base + digito1, pesosSegundoDigito);

  return cnpj.endsWith(`${digito1}${digito2}`)
    ? null
    : { documentoInvalido: true };
}
