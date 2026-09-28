# 📋 Sistema de Chamados

Sistema web desenvolvido para gerenciamento de chamados, permitindo cadastrar, visualizar, editar e excluir solicitações.

O projeto foi desenvolvido como forma de colocar em prática conhecimentos de **desenvolvimento Front-end, Back-end, APIs REST, banco de dados, SQL e deploy**, desde o desenvolvimento local até a disponibilização da aplicação na internet.

## 🌐 Projeto online

**Aplicação:**  
https://cadastro-chamados.vercel.app

**API:**  
https://cadastro-chamados.onrender.com

---

## 📌 Sobre o projeto

O Sistema de Chamados permite que usuários registrem solicitações e acompanhem suas informações através de uma interface web.

Cada chamado possui informações como:

- Assunto
- Requisitante
- Prioridade
- Status
- Data de abertura

A aplicação também possui contadores para acompanhar a quantidade de chamados de acordo com seus respectivos status.

O projeto possui uma arquitetura separada em **Front-end, Back-end e Banco de Dados**, permitindo que cada parte tenha uma responsabilidade específica.

---

## Estrutura do projeto

treinos/
│
├── principal/
│ │
│ ├── backend/
│ │ ├── package.json
│ │ ├── package-lock.json
│ │ └── server.js
│ │
│ └── frontend/
│ ├── index.html
│ ├── script.js
│ └── style.css
│
├── .env
└── .gitignore

---

## 🚀 Funcionalidades

- [x] Cadastrar chamados
- [x] Listar chamados
- [x] Editar chamados
- [x] Excluir chamados
- [x] Definir prioridade
- [x] Alterar status
- [x] Registrar data de abertura
- [x] Contabilizar chamados por status
- [x] Persistir dados em banco de dados
- [x] Comunicação entre Front-end e Back-end através de API REST
- [x] Aplicação disponibilizada online

---

# 🖥️ Tecnologias utilizadas

## Front-end

- HTML5
- CSS3
- JavaScript
- Fetch API

## Back-end

- Node.js
- Express
- mysql2
- CORS
- dotenv

## Banco de dados

- MySQL durante o desenvolvimento local
- TiDB Cloud na aplicação online

O TiDB Cloud utiliza compatibilidade com o protocolo MySQL, permitindo a utilização da biblioteca `mysql2` utilizada no projeto.

## Ferramentas e serviços

- Visual Studio Code
- Git
- GitHub
- Thunder Client
- Vercel
- Render
- TiDB Cloud

## 👨‍💻 Autor

Dimitri Rosso .
