<h2 align="center">Teste para candidatos à vaga de Estagiário em Desenvolvimento Back-end</h2>

Nesse teste analisaremos seu conhecimento nas tecnologias solicitadas e agilidade de desenvolvimento, trabalhando em uma API REST NodeJS escrita em TypeScript.

### Instruções

Você deverá implementar as funcionalidades pendentes da API de uma aplicação de `To-do list` (gestão de tarefas pessoais). Nela, um usuário (`User`) poderá criar, visualizar, editar e deletar suas tarefas (`Todo`s).

Você é livre para escolher quais atributos um `Todo` deve ter. Algumas sugestões são:

```typescript
interface Todo {
  description: string // Descrição da tarefa
  userId: string // Usuário que criou a tarefa
  completed: boolean // Tarefa foi executada ou não
}
```

Você não precisa se preocupar no _como_ implementar as funcionalidades. Já existem implementações semelhantes para a entidade `User` (mais detalhes na sessão [Tarefas](#tarefas)). Sua função é imitar as implementações que já foram feitas, editando aquilo que for necessário.

Detalhes da estrutura utilizada estão em [estrutura.md](./estrutura.md).

### Critérios avaliados

- Capacidade de reconhecer padrões no código e adaptá-los.
- Legibilidade e padronização do código

### Tarefas

- Criação das entidades

  - [ ] Criar a entidade `Todo`

    - Arquivo [src/core/entities/Todo.ts](./src/core/entities/Todo.ts)
    - Veja [entidade `User`](./src/core/entities/User.ts)
    - Um `Todo` deve ter alguma referência ao `User` que o criou. Fora isso, você pode escolher os atributos que achar necessário

- Criação dos casos de uso

  - [ ] Criar o caso de uso createTodo

    - Arquivo [src/core/usecases/createTodo.ts](./src/core/usecases/createTodo.ts)
    - Veja [caso de uso `createUser`](./src/core/usecases/createUser.ts)

  - [ ] Criar o caso de uso getTodos

    - Arquivo [src/core/usecases/getTodos.ts](./src/core/usecases/getTodos.ts)
    - Veja [caso de uso `getUsers`](./src/core/usecases/getUsers.ts)

  - [ ] Criar o caso de uso updateTodo

    - Arquivo [src/core/usecases/updateTodo.ts](.src/core/usecases/updateTodo.ts)
    - Veja [caso de uso `updateUser`](./src/core/usecases/updateUser.ts)

  - [ ] Criar o caso de uso deleteTodo

    - Arquivo [src/core/usecases/deleteTodo.ts](./src/core/usecases/deleteTodo.ts)
    - Veja [caso de uso `deleteUser`](./src/core/usecases/deleteUser.ts)

- Criação das rotas de acesso

  - [ ] Criar a rota de criação de um Todo (`POST /v1/todos`)

    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

  - [ ] Criar a rota exibição dos Todos (`GET /v1/todos`)

    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

  - [ ] Criar a rota atualização de um Todo (`PUT /v1/todos/:id`)

    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

  - [ ] Criar a rota deleção de um Todo (`DELETE /v1/todos/:id`)
    - Arquivo [src/app/routes/todos.ts](./src/app/routes/todos.ts)
    - Veja [`app/routes/users.ts`](./src/app/routes/users.ts)

#### Bônus

- [ ] Corrigir os arquivos de teste respectivos de cada caso de uso ([createTodo.spec.ts](./src/core/usecases/createTodo.spec.ts), [getTodos.spec.ts](./src/core/usecases/getTodos.spec.ts), etc)

### Entrega

Você deverá criar um fork desse repositório, desenvolver as funcionalidades propostas e enviá-lo para o e-mail contato@uperttech.com

### Dúvidas

Quaisquer dúvidas que você venha a ter podem ser submetidas nas issues do repositório ou via e-mail (contato@uperttech.com). Consulte as issues para ver se alguém já não teve a mesma dúvida.
