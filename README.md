# todo — Lista de tarefas full-stack

Front-end em **React + TypeScript** de uma lista de tarefas que persiste os dados na [To-Do API](https://github.com/SamuelMuleu/to-do-api) (Node.js, Express e MongoDB).

🔗 **Demo:** https://organizelist.netlify.app

## Funcionalidades

- Criar, concluir/reabrir e excluir tarefas
- Contador de tarefas criadas e concluídas; pendentes aparecem primeiro
- Atualizações otimistas (a tela responde na hora e desfaz se a API falhar)
- Estados de carregamento, lista vazia e erro com "tentar novamente"
- Layout responsivo e acessível (rótulos, foco visível, navegação por teclado)

## Stack

React 18 · TypeScript · Vite · CSS Modules · Axios · Phosphor Icons

## Rodando localmente

1. Suba a API ([to-do-api](https://github.com/SamuelMuleu/to-do-api)) em `http://localhost:3001`.
2. Opcionalmente crie um `.env.local` apontando para outra URL:

   ```bash
   VITE_API_URL=https://sua-api.vercel.app
   ```

3. Rode o front:

   ```bash
   npm install
   npm run dev
   ```

## Estrutura

```
src/
  lib/api.ts                 # cliente HTTP e tipos
  App.tsx                    # estado da lista e regras de carregamento/erro
  components/
    Header/
    AddTaskForm/             # formulário e contadores
    Tasks/                   # lista, item e estado vazio
```
