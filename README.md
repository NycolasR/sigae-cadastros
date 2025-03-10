# SIGAE Open Source - Microfrontend de Cadastros

Este repositório contém o microfrontend _cadastros_ do projeto SIGAE.

## Tecnologias Utilizadas

- **Angular 19** (Standalone)
- **Native Federation 19**
- **PrimeNG**
- **Primeicons**
- **Tailwind**
- **MSW**

## Configuração e Execução

1. **Clone o repositório:**
   ```sh
   https://github.com/NycolasR/sigae-cadastros.git
   cd sigae-cadastros
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Estabeleça o link com o repositório _sigae-autenticacao_**
   ```sh
   npm link autenticacao
   ```

4. **Inicie a aplicação:**
   ```sh
   npm start
   ```
   A aplicação estará disponível em `http://localhost:4202`.

## Configuração dos Microfrontends

A aplicação _sigae-cadastros_ é um dos microfrontends que são carregados dinamicamente na aplicação _host_. Certifique-se de que o arquivo `federation.manifest.json` está corretamente configurado expondo os componentes certos.

Exemplo de configuração:
```ts
  exposes: {
    './Component': './src/app.component.ts',
    "./routes": "./src/app.routes.ts",
    './EscolaService': './src/app/services/escola.service.ts',
    './PessoaService': './src/app/services/pessoa.service.ts'
  }
```

## Contribuição

1. Fork o repositório.
2. Crie uma branch para sua feature.
3. Realize as modificações e commit.
4. Envie um Pull Request.

## Licença

Este projeto está sob a licença MIT.

