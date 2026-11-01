# Testes E2E com Cypress

Projeto de automação de testes end-to-end para o site [Automation Exercise](https://automationexercise.com), desenvolvido com Cypress.

## Cenários cobertos

Os testes validam fluxos como:

- Cadastro de usuário e tentativa de cadastro com e-mail já existente;
- Login e logout;
- Navegação e busca de produtos;
- Compra com cadastro antes do checkout;
- Compra com login antes do checkout.

Os cenários estão organizados em specs Cypress na pasta `cypress/e2e/spec`.

## Tecnologias

- JavaScript
- Cypress
- Node.js e npm
- Cypress Mochawesome Reporter para relatórios de execução

## Pré-requisitos

- Node.js e npm instalados
- Acesso à internet, pois os testes acessam o site Automation Exercise

## Instalação

Clone o repositório e instale as dependências:

```bash
npm install

Para rodar os testes:

npm run cypress:open
