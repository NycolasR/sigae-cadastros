
import { setupWorker } from 'msw/browser';
import { isDevMode } from '@angular/core'
import { EscolasMock } from './escola-mock';
import { PessoasMock } from './pessoa-mock';

export const setupMsw = async () => {
  // if (isDevMode()) {
  //   return;
  // }

  const worker = setupWorker(...EscolasMock.concat(PessoasMock) );
  await worker.start();
};