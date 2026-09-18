# mean-openclaw-fe

Angular 22 frontend for a **MEAN + OpenClaw AI Business Agent**.

This project demonstrates how **Angular, Node.js, Express, MongoDB, OpenClaw, Ollama, and WhatsApp** can be combined to build AI-powered business workflows.

---

# 🚀 Demos

## Demo #1 — OpenClaw WhatsApp Agent ✅

An OpenClaw-powered WhatsApp agent that allows users to interact with the business assistant directly through WhatsApp.

The agent can receive WhatsApp messages, process business requests, interact with CRM tools, and return responses to the user.

### Example

**WhatsApp User**

> How many customers are in the CRM?

**OpenClaw Agent**

> There are 5 customers in the CRM.

### WhatsApp Flow

```text
WhatsApp User
      ↓
   WhatsApp
      ↓
   OpenClaw
      ↓
AI Business Agent
      ↓
 ┌────┴─────┐
 ↓          ↓
CRM Tools  Ollama
 ↓          ↓
MongoDB   AI Response
      ↓
WhatsApp Response
```

### Demo #1 Highlights

* WhatsApp integration
* OpenClaw agent
* AI-powered conversations
* CRM tool integration
* MongoDB customer data
* Ollama fallback for general questions

---

# 🤖 Demo #2 — OpenClaw AI Business Agent

An AI-powered business assistant that understands business requests and executes **tools/functions** against CRM data.

The assistant uses CRM tools for structured business operations and falls back to Ollama for general AI questions.

## 🔧 Tool / Function Calling

The agent currently supports CRM functions such as:

* `getCustomerCount`
* `searchCustomers`
* `getCustomer`
* `createCustomer`
* `updateCustomer`
* `deleteCustomer`

### Customer Count

**User**

> How many customers are in the CRM?

**AI Agent**

> There are 5 customers in the CRM.

The agent executes:

```text
getCustomerCount()
```

---

### Vehicle Search

**User**

> Which customers have Toyota vehicles?

**AI Agent**

> Ahmed Khan — Toyota Corolla (2022)
> Usman Ali — Toyota Yaris (2021)

The agent executes:

```text
searchCustomers({
  query: "toyota"
})
```

---

### Customer Details

**User**

> Find Ahmed Khan and give me his phone, email, and vehicle details.

**AI Agent**

> Ahmed Khan
> Phone: +923001111111
> Email: [ahmed@example.com](mailto:ahmed@example.com)
> Vehicle: Toyota Corolla (2022)

The agent executes:

```text
searchCustomers({
  query: "Ahmed Khan"
})
```

---

## 🧠 General AI Fallback

Questions that are not CRM-related are passed to the AI model through **OpenClaw + Ollama**.

### Example

**User**

> What is the capital of France?

**AI Agent**

> The capital of France is Paris.

This allows the same business assistant to handle both:

* Structured CRM operations
* General AI conversations

### Request Flow

```text
User Question
      ↓
OpenClaw AI Business Agent
      ↓
 ┌────┴─────┐
 ↓          ↓
CRM Intent  General Question
 ↓          ↓
CRM Tool   Ollama
 ↓          ↓
MongoDB   AI Response
 ↓          ↓
 └────┬─────┘
      ↓
  Final Response
```

---

# 🏗️ Architecture

```text
                         ┌──────────────────┐
                         │       User       │
                         └────────┬─────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                  Angular                  WhatsApp
                     │                         │
                     └────────────┬────────────┘
                                  │
                                  ↓
                       ┌────────────────────┐
                       │      OpenClaw      │
                       │   Business Agent   │
                       └──────────┬─────────┘
                                  │
                         ┌────────┴────────┐
                         │                 │
                   CRM Request       General Request
                         │                 │
                         ↓                 ↓
                  Tool / Function        Ollama
                      Calling              │
                         │                 │
                         ↓                 ↓
                     MongoDB          AI Response
                         │                 │
                         └────────┬────────┘
                                  ↓
                             Final Response
```

---

# 🛠️ Tech Stack

* **Angular 22** — Frontend
* **TypeScript** — Application development
* **Node.js** — Backend runtime
* **Express** — REST API
* **MongoDB** — CRM data storage
* **OpenClaw** — AI agent orchestration
* **Ollama** — Local AI inference
* **Qwen** — Local language model
* **Tool / Function Calling** — Business operations
* **WhatsApp** — Messaging interface

---

# 📁 Project Structure

```text
mean-openclaw-fe/
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   ├── features/
│   │   └── ...
│   │
│   ├── assets/
│   └── ...
│
├── public/
├── angular.json
├── package.json
└── README.md
```

---

# 💻 Development Server

Install dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

Once the server is running, open:

```text
http://localhost:4200/
```

The application automatically reloads whenever source files are modified.

---

# 🏗️ Building

Create a production build:

```bash
ng build
```

The compiled application is generated in:

```text
dist/
```

By default, the production build optimizes the application for performance and speed.

---

# 🧪 Running Unit Tests

Run unit tests with Vitest:

```bash
ng test
```

---

# 🧪 Running End-to-End Tests

Run end-to-end tests:

```bash
ng e2e
```

Angular CLI does not include an end-to-end testing framework by default. You can add the framework of your choice.

---

# 🔗 Backend

The frontend communicates with the accompanying backend for:

* AI assistant requests
* CRM operations
* OpenClaw integration
* Tool/function execution
* Ollama fallback
* MongoDB operations
* WhatsApp agent integration

---

# 🎯 Project Goal

The goal of this project is to demonstrate a practical **AI-powered business agent architecture** where an AI assistant can move beyond simple conversation and perform real business operations.

The architecture combines:

```text
AI Conversation
       +
Tool / Function Calling
       +
Business Data
       +
CRM Operations
       +
MongoDB
       +
WhatsApp
       +
Local AI with Ollama
```

The result is an AI business assistant capable of:

1. Understanding business requests
2. Selecting the appropriate CRM operation
3. Executing structured tools/functions
4. Reading business data from MongoDB
5. Returning useful business responses
6. Falling back to Ollama for general AI questions
7. Communicating through both a web interface and WhatsApp

---

# 📚 Additional Resources

* [Angular CLI](https://angular.dev/tools/cli)
* [OpenClaw](https://github.com/openclaw/openclaw)
* [Ollama](https://ollama.com/)
* [MongoDB](https://www.mongodb.com/)
* [Vitest](https://vitest.dev/)
