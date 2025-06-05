# 📘 Explicação sobre JWT, Access Token, Refresh Token e Verificação por E-mail

## 🔐 O que é o JWT?

JWT (JSON Web Token) é uma forma compacta e segura de transmitir informações entre partes como um objeto JSON. Ele é amplamente usado em autenticação e autorização de usuários.

---

## 📌 Access Token

O `access_token` é o token que autentica o usuário e permite que ele acesse rotas protegidas.

- Contém informações como: ID do usuário, nome, permissões, etc.
- Expira rápido (ex: 15 minutos) para aumentar a segurança.

### 🔍 Exemplo de payload de um JWT:

```json
{
  "sub": "123",           // ID do usuário
  "name": "Thiago",
  "role": "user",
  "exp": 1723640000        // Data de expiração (em timestamp)
}
```

---

## 🔄 O que é o Refresh Token?

O `refresh_token` é um token com validade mais longa (ex: 7 dias).

- Ele é usado para gerar um novo `access_token` automaticamente quando este expira.
- Não é enviado em cada requisição comum.
- É armazenado com mais segurança (por exemplo, em um cookie HttpOnly).

### 🔁 Como funciona a renovação

Quando o `access_token` expira, o frontend faz uma requisição como:

```http
POST /refresh-token
Content-Type: application/json

{
  "refresh_token": "..."
}
```

E o backend responde com um novo `access_token`.

---

## ❓ Por que não usar só o access_token com validade de 7 dias?

JWTs são auto-contidos e **não podem ser invalidados** manualmente. Se um token for roubado, ele será válido até expirar.

### ✅ Melhor abordagem:

| Token          | Validade | Finalidade                         |
|----------------|----------|------------------------------------|
| access_token   | 15 min   | Segurança                          |
| refresh_token  | 7 dias   | Comodidade (renovação automática) |

---

## 📧 Onde entra a verificação por e-mail?

A verificação por e-mail ocorre **após o cadastro do usuário**, antes do login ser liberado.

### 🧭 Fluxo:

1. Usuário se cadastra
2. Sistema salva `verificado: false`
3. Envia e-mail com link/token de verificação
4. Usuário clica no link → sistema marca `verificado: true`
5. Agora o usuário pode fazer login normalmente

🔒 O login **só é permitido** se o e-mail estiver confirmado.

---

## 🔁 Fluxo completo da autenticação

```plaintext
Cadastro →
  Sistema salva usuário com verificado: false
  ↓
  Envia e-mail de verificação com link/token
  ↓
  Usuário confirma e-mail (verificado: true)
  ↓
Login →
  Sistema gera:
    ✔ access_token (15 min)
    ✔ refresh_token (7 dias)
  ↓
Frontend guarda tokens
  ↓
Frontend envia access_token nas requisições seguras
  ↓
Se access_token expirar → usa refresh_token para renovar
```

---

## 🛡️ Armazenamento dos tokens no Frontend

| Tipo de Armazenamento | Vantagens               | Desvantagens            |
|------------------------|-------------------------|--------------------------|
| `localStorage`         | Fácil de usar           | Vulnerável a ataques XSS |
| `sessionStorage`       | Some ao fechar a aba    | Também vulnerável a XSS |
| Cookie HttpOnly        | Mais seguro             | Mais difícil de implementar/testar |

---

## ✅ Benefícios do modelo com JWT

- 🔐 Tokens curtos reduzem riscos em caso de vazamento
- 🔁 Renovação automática da sessão
- 📧 Verificação de identidade real via e-mail
- 🚀 Frontend desacoplado: não precisa consultar o banco para autenticação
- 📦 Token auto-contido: informações básicas já vêm no token

---

## 💡 Pega o bizu que eu aprendi(Mas não uso kkk):

Nunca armazene informações sensíveis (como senhas ou dados pessoais) dentro do JWT.

Use-o apenas como um identificador seguro e temporário para o usuário.

---
