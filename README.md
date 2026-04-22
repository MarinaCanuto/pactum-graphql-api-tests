# 🚀 Projeto de Automação de Testes de API - Loja EBAC

Este repositório contém a suíte de testes automatizados para a API da Loja EBAC, desenvolvida durante o curso de Qualidade de Software. O projeto cobre testes funcionais (CRUD), GraphQL e testes de contrato utilizando o framework PactumJS.

---

## 🛠️ Tecnologias Utilizadas

* Node.js: Ambiente de execução.
* Mocha: Framework de testes (Test Runner).
* PactumJS: Biblioteca principal para testes de API e Contrato.
* Pactum-Matchers: Para validação dinâmica de tipos e estruturas de dados.
* Mochawesome: Gerador de relatórios HTML.

---

## 📂 Estrutura do Projeto

test/
├── api/
│   ├── categories.test.js      # CRUD de Categorias
│   ├── login.test.js           # Autenticação via REST
│   ├── products.test.js        # CRUD de Produtos
│   └── user.test.js            # Gestão de Usuários
├── contract/
│   ├── categories.contract.test.js # Contrato: Categorias
│   ├── loginConsumer.test.js       # Contrato: Login (Consumer)
│   ├── loginProvider.test.js       # Contrato: Login (Provider)
│   └── products.contract.test.js   # Contrato: Produtos
└── graphql/
    ├── login.test.js           # GraphQL: Autenticação
    ├── user.test.js            # GraphQL: Queries de Usuários
               

---

## 🚀 Como Executar os Testes

### 1. Instalar Dependências
Certifique-se de estar na raiz do projeto e execute:
npm install

### 2. Executar Todos os Testes
npm test

### 3. Executar Testes de API (Funcional REST)
npm run test:rest

### 4. Executar Testes de Contrato
npm run test:contract

### 5. Executar Tudo e Gerar Relatório HTML (Mochawesome)
npm run report

---

## 📝 Observações Técnicas

### Resiliência nos Testes de Contrato
Durante o desenvolvimento, identifiquei que a base de dados pública da API contém registros inconsistentes criados por diversos usuários (ex: campos name como null ou ausência do campo quantity). 

Para garantir a estabilidade da automação, os testes de contrato foram configurados de forma resiliente, focando na validação de esquemas obrigatórios (como _id) ou utilizando matchers para validar tipos em vez de valores fixos, evitando falhas por dados "sujos" de terceiros.

### Autenticação
Os testes de Produtos e Categorias possuem um hook before que realiza a autenticação administrativa automaticamente, capturando o token JWT e configurando-o nos headers globais para as operações de escrita (POST, PUT, DELETE).

---

## 👤 Autor
Marina Canuto - QA Automation Student