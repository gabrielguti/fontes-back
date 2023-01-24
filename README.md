# Fontes backend

API desenvolvida com o intuito de gerenciar projetos de usuários registrados. Sendo possível criar usuários, criar projetos e realizar a atualização/edição dos respectivos projetos. 

## Principais tecnologias utilizadas
- Node js / Typescript
- Prisma
- Express
- Docker
- Postgres

## Como executar o projeto
- Baixe/clone o repositório disponibilizado
- Configure as variáveis de ambiente listadas no arquivo .env.example
- Instale as dependências da aplicação com o comando ``` yarn install ```
- Para criar a conexão com o banco e consequentemente as tabelas utilize o comando ```docker-compose up -d ``` e em seguida ``` yarn migrate:up ```
- com a conexão estabelecida e as tabelas criadas com o comando ``` yarn start ```a aplicação estará rodando na porta ``` localhost:3000 ```. Você estará apto a utilizar os endpoints.

## Endpoints:

### Cadastro de usuário
```POST /users - FORMATO DE ENTRADA:  ``` 
  
```json
{
	"name": "Gabriel",
	"password": "123456",
	"username": "gabriel-dev"
}
```
 ```POST /users - FORMATO DE SAÍDA - STATUS 201: ``` 

```json
{
  "id": "6984d12c-0eb8-40b3-9d9e-93022e23905b",
  "name": "Gabriel",
  "username": "gabriel-dev"
}
```
### Login 

`POST /login - FORMATO DE ENTRADA:`
```json
{
    "username": "gabriel-dev",
    "password": "123456"
}
```
`POST /login - FORMATO DE SAÍDA - STATUS 200:`
```json
{
  "accessToken": "eyJhbGciOiJIUzIjoiMSJ9MkgprS3kvUpaZtQKhQYSAGJjE9P7x9HGJiDE",
  "username": "gabriel-dev"
}
```
### Cadastro de projeto 
```POST /project - FORMATO DE ENTRADA:  ``` 

Headers: ```username```  

```json 
{	
  "title": "Back-fontes",
  "zip_code": 88064092,
  "cost": 1928873,
  "deadline": "2023-01-10T00:00:00.000Z"
}
```
 ```POST /project - FORMATO DE SAÍDA - STATUS 201: ``` 

```json
{
  "id": "f3ce3b96-5d60-4b44-a385-81c83b4d9dda",
  "title": "Back-fontes",
  "zip_code": 88064092,
  "cost": 1928873,
  "done": false,
  "deadline": "2023-01-10T00:00:00.000Z",
  "username": "gabriel-dev",
  "created_at": "2023-01-22T15:44:31.287Z",
  "updated_at": "2023-01-22T15:44:31.287Z"
}
```

### Buscar projeto(s) por usuário
```GET - /projects - FORMATO DE ENTRADA:  ``` 

Headers: ```username```  
 
 ```GET - /projects - FORMATO DE SAÍDA - STATUS 200: ``` 

```json
{
  "projects": [
    {
      "id": "7ac36869-4891-4dfc-abfa-4705efd14725",
      "title": "Frontend-fontes",
      "zip_code": 88064092,
      "cost": 1928873,
      "done": false,
      "deadline": "2023-01-10T00:00:00.000Z",
      "username": "gabriel-dev",
      "created_at": "2023-01-21T00:56:20.766Z",
      "updated_at": "2023-01-21T00:56:20.766Z"
    },
    {
      "id": "2d86ed01-f97c-45a6-abc7-9f38a2ff9004",
      "title": "Back-fontes",
      "zip_code": 82600290,
      "cost": 100,
      "done": true,
      "deadline": "2025-01-10T00:00:00.000Z",
      "username": "gabriel-dev",
      "created_at": "2023-01-21T00:29:45.979Z",
      "updated_at": "2023-01-21T01:31:24.205Z"
    }
  ]
}
```
### Buscar projeto pelo ID
```GET - /project - FORMATO DE ENTRADA:  ``` 

Headers: ```project_id```  
 
 ```GET - /project - FORMATO DE SAÍDA - STATUS 200: ``` 

```json
{
  "project": {
    "id": "4fd9d3fa-2d71-459d-985a-a78f8a69731c",
    "title": "Frontend-fontes",
    "zip_code": "Florianópolis/SC",
    "cost": 19888,
    "done": false,
    "deadline": "2023-01-27T19:30:40.000Z",
    "username": "gabriel-dev",
    "created_at": "2023-01-22T19:40:30.950Z",
    "updated_at": "2023-01-22T19:40:30.950Z"
  }
}
```
### Editar informações do projeto
```PUT /projects/:id - FORMATO DE ENTRADA:  ``` 

Headers: ```username```  

```json 
{
    "title": "FullStack",
    "zip_code": 82600290,
    "cost": 1004566,
    "deadline": "2025-01-10T00:00:00.000Z"
}
```
 ```PUT /projects/:id - FORMATO DE SAÍDA - STATUS 200: ``` 

```json
{
  "message": "Project updated."
}
```
### Concluir projeto
```PATCH /projects/:id - FORMATO DE ENTRADA:  ``` 

Headers: ```username```  

 ```PATCH /projects/:id - FORMATO DE SAÍDA - STATUS 200: ``` 

```json
{
  "message": "Project updated."
}
```
### Deletar projeto
```DELETE /projects/:id - FORMATO DE ENTRADA:  ``` 

Headers: ```username```  

 ```DELETE /projects/:id - FORMATO DE SAÍDA - STATUS 200: ``` 

```json
{
  "message": "Project deleted."
}
```




