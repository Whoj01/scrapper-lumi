<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-comandos">Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-comandos">Comandos</a>
</p>

## 🚀 Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:

- Backend
  - Typescript
  - Fastify
- Frontend
  - Typescript
  - NextJs 14

## Bibliotecas
- Backend
  - [Prisma](https://www.prisma.io/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Fastify](https://fastify.dev/) 
  - [Biomejs](https://biomejs.dev/pt-br/)
  - [Zod](https://zod.dev/)
  - [Vitest](https://vitest.dev/)
  - [Jsqr](https://www.npmjs.com/package/jsqr)
  - [Sharp](https://www.npmjs.com/package/sharp)
  - [Pino](https://github.com/pinojs/pino)
  - [aws-sdk](https://www.npmjs.com/package/aws-sdk)
  - [pdfreader](https://www.npmjs.com/package/pdfreader)

- Frontend
  - [Typescript](https://www.typescriptlang.org/)
  - [Nextjs](https://nextjs.org/)
  - [Tailwind](https://tailwindcss.com/)
  - [Shadcn](https://ui.shadcn.com/)
  - [Lucide React](https://lucide.dev/)
  - [Vitest](https://vitest.dev/)
  - [react-chartjs-2](https://react-chartjs-2.js.org/)
  - [Axios Mock Adapter](https://www.npmjs.com/package/axios-mock-adapter)

## 💻 Projeto

 Esse projeto foi desenvolvido para o teste de vaga da Lumi desenvolvedor Pleno, com o objetivo de testar as capacidades técnicas do candidato.
 Para o Backend eu utilizei o *Repository Pattern* para ter inversão das dependencias e modalização dos componentes para testes.
 No Frontend utilizei o Nextjs 14, se utilizando de custom hooks e *Composition Pattern* para modular o código e deixar cada arquivo com sua responsabilidade.
 Acess

## 🚀 Deploy
 Fiz o código para deploy que pode ser visualizado nos commits anteriores, mas a vps não suportou os containers. :(

## 🔖 Layout
 Você pode acessar o layout do projeto clicando [nesse link](https://www.figma.com/community/file/1322274638806799085)

## 🎆 Funcionalidades

Essas são as funcionaliadades do projeto: 

- Backend
  - Extração dos dados relevantes do pdf fornecido.
  - Extração e leitura do qrcode para obter de seu valor.
  - Tranformação do qrcode em imagem para upload na aws s3.
  - Uplaod do pdf para a aws s3.
  - Logger com informações sobre o que está acontecendo no servidor.
  - Pesquisa por identificador do usuário.
  - Retorno de todos os usuários.
  - Pesquisa por indentificador do usuário em contas.
  - Retorno de todas as contas.
  - Retorno de fatura pelo mês e usuário referente.

- Fronted
  - Loading skeleton em toda a aplicação se utilizando da Suspense API.
  - Tratamento de erros.
  - Tratamento de página não encontrada.
  - Página de dashboard com informações revelantes sobre os dados do usuário.
  - Página de Faturas com tabela para baixar pdf e visualizar o qrcode, podendo ler e copiar o pix.
  - Filtro de informações na tabela por usuário.
  - Responsividade Completa
  - Pesquisa por usuários, podendo ver todos os dados das faturas separado pelos meses.
  - Pesquisa na tabela de faturas, para visualizar um usuário fácilmente.

- Projeto
  - Dockarização com hotreload para facilitar reprodução em diversos ambientes.

## ⌨ Comandos

Primeiro comece clonando o repositório

``` git clone https://github.com/Whoj01/Lumi-test.git ```

**Backend**
seguindo para o backend escreva em seu terminal 

``` cd server ```

Copie o .env.example o renomenando para .env e ensira as váriaveis desse arquivo nele [clicando aqui](https://docs.google.com/document/d/e/2PACX-1vRFemLE0gKtnVjC-TKhLiwFsGzI5LRs-akLedbcnFdsxz5n-mwIav5ogMZ5iMsqSnmJjDBaNpQgF-xV/pub)

Instale as depêndencias.  

``` npm install  ```

Vamos inicializar o nosso client prisma:

``` npx prisma generate ```

**Frontend**

Vamos voltar uma pasta e entrar no projeto Frontend:

``` cd ../web ```

Vamos instalar as dependências para não reclamar sobre os imports:

``` npm i ```

**Projeto**

Depois de instalar as depêndencias para não ter erros no desenvolvimento e teste, vamos levantar nosso container docker do projeto:

``` sudo docker compose up -d --build ```

Antes de acessar o projeto precisamos rodar os comandos necessários para alimentação do banco de dados e garantir que o schema do prisma esteja de acordo.

Vamos primeiro ao prisma:

``` sudo docker exec -it server npx prisma migrate deploy  ```

``` sudo docker exec -it server npx prisma db push  ```

Com esses comandos o schema esta compátivel com o banco de dados.

Vamos alimentar o banco de dados pelo script agora:

``` sudo docker exec -it server npm run database:seed  ```

**Caso na etapa anterior o terminal retornar Error: O ilovepdf chegou ao limite de conversões, a API do ilovepdf chegou ao limite de 300 arquivos, caso isso aconteça. deixei outra chave reserva no arquivo .env do drive**

Caso queiram testar novamente o script, eu escrevi outro que limpa o banco de dados e remove os items da S3:

``` sudo docker exec -it server npm run database:clear  ```

Agora é so acessar o projeto web e ver os dados em sua tela 🔥

**Testes**

O Frontend e o Backend estão com o mesmo comando para testes, sendo os seguintes:

Rodar os testes: 

``` npm run test ```

Rodar os testes em watch:

``` npm run test:watch ```

Rodar o coverage do código

``` npm run test:cov ```

 ---

<p>Feito com ❤️ por Josué Dias 👋🏽 Entre em contato!</p>

[![Linkedin Badge](https://img.shields.io/badge/-Josuedias-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://https://www.linkedin.com/in/nycole-xavier-641271202/)](https://www.linkedin.com/in/josué-dias-271458224/)
