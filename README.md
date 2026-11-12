# Spendly

> Gerencie suas finanças de maneira dinâmica.

**[Ver demonstração →](https://spendly-o2va.onrender.com)**

## Sobre

Spendly é uma aplicação web full-stack para controle de finanças pessoais. O usuário registra receitas e despesas e acompanha a evolução do seu saldo em um painel com gráficos.

## Funcionalidades

- Cadastro e login com autenticação JWT
- Foto de perfil
- Registro de receitas e despesas, com ícone (emoji) por categoria
- Painel com saldo, últimas transações e despesas dos últimos 30 dias
- Gráficos de linha, barras e pizza
- Exportação de receitas e despesas para Excel

## Tecnologias

| Camada | Stack |
| --- | --- |
| Front-end | React 19, Vite, Tailwind CSS, React Router, Recharts, Axios |
| Back-end | Node.js, Express, JWT, bcrypt, Multer |
| Banco de dados | MongoDB (Mongoose) |
| Deploy | Render |

## Como executar

**Pré-requisitos:** Node.js 20+ e uma instância do MongoDB (local ou Atlas).

```bash
git clone https://github.com/niethilleybrazz/spendly.git
cd spendly
```

Crie o arquivo `backend/.env`:

```env
MONGO_URI=sua_string_de_conexao
JWT_SECRET=uma_chave_secreta
PORT=8000
CLIENT_URL=http://localhost:8000
```

### Desenvolvimento

```bash
# terminal 1: API
cd backend
npm install
npm run dev

# terminal 2: interface
cd frontend/spendly
npm install
npm run dev
```

A interface fica disponível em `http://localhost:5173`.

### Produção

Na raiz do projeto, o build do front-end é servido pelo próprio Express:

```bash
npm run build
npm start
```

## API

Todas as rotas, exceto registro e login, exigem o header `Authorization: Bearer <token>`.

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Cria uma conta |
| POST | `/api/v1/auth/login` | Autentica o usuário |
| GET | `/api/v1/auth/getUser` | Dados do usuário logado |
| POST | `/api/v1/auth/upload-image` | Envia a foto de perfil |
| GET | `/api/v1/dashboard` | Resumo do painel |
| POST | `/api/v1/income/add` | Adiciona uma receita |
| GET | `/api/v1/income/get` | Lista as receitas |
| GET | `/api/v1/income/downloadexcel` | Exporta as receitas (.xlsx) |
| DELETE | `/api/v1/income/:id` | Remove uma receita |
| POST | `/api/v1/expense/add` | Adiciona uma despesa |
| GET | `/api/v1/expense/get` | Lista as despesas |
| GET | `/api/v1/expense/downloadexcel` | Exporta as despesas (.xlsx) |
| DELETE | `/api/v1/expense/:id` | Remove uma despesa |

## Estrutura

```
spendly/
├── backend/
│   ├── config/        # conexão com o banco
│   ├── controllers/   # regras de negócio
│   ├── middleware/    # autenticação e upload
│   ├── models/        # schemas do Mongoose
│   └── routes/
└── frontend/spendly/
    └── src/
        ├── components/
        ├── context/
        ├── hooks/
        ├── pages/
        └── utils/
```

## Autora

**Niethilley Alves Braz Pereira**
[GitHub](https://github.com/niethilleybrazz)
