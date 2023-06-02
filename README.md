# Testel5

Este é um projeto de teste para a empresa L5. Ele consiste em um CRUD de cadastro de usuário com validações e verificações. O projeto foi desenvolvido em TypeScript e utiliza o framework Express.

## Funcionalidades

- Cadastro de usuários com validação de campos.
- Atualização de informações do usuário.
- Exclusão de usuário.
- Consulta de usuário por NOME, CPF, PHONE E EMAIL.
- Envio de arquivos de áudio e imagem para o Amazon S3.
- Consulta a api do github



## Tecnologias Utilizadas

- Linguagem: TypeScript
- Framework: Express.js
- Banco de Dados: PostgreSQL (RDS)
- Armazenamento de Arquivos: Amazon S3
- Deploy: Amazon EC2
- Controle de Versão: Git e GitHub Actions
- Criptografia de Senha: bcrypt
- Consumo de API: axios
- ORM: Prisma

## Pré-requisitos

- Node.js >18.13.0
- Yarn
## Instalação

1. Clone este repositório:

- git clone git@github.com:BrenoOliveira2002/testeL5.git

2. Instale as dependencias do projeto

- yarn install 

## Configuração

Antes de executar o projeto, você precisa configurar as seguintes variáveis de ambiente:

## (obs): Eu deixei no arquivo .env as minhas chaves de acesso ao serviços da amazon ja então não é necessario mudar nenhum dado de lá.

DATABASE_URL: String de conexão com o banco de dados PostgreSQL.
AWS_ACCESS_KEY_ID: Chave de acesso da conta AWS para acesso ao Amazon S3.
AWS_SECRET_ACCESS_KEY: Chave secreta de acesso da conta AWS para acesso ao Amazon S3.
AWS_REGION: Região do s3

## Uso

Inicie o servidor de desenvolvimento:   

- yarn dev

Build do projeto:

- yarn build

Inicie o servidor em produção:

- yarn start




