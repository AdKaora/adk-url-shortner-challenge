# Full Stack Developer Test - URL Shortener

## Introduction
Welcome to the AdKaora Full Stack Developer Test 😁 . In this task, you will build a URL shortening service. This is a typical web application where users input a long URL, and your application will generate a short, unique URL. The goal is to demonstrate your skills in both frontend and backend development, as well as your ability to structure a scalable application.

We are not looking for a perfect solution but rather how you approach the problem, how you organize your code, and how you justify the choices you make during development. Feel free to be creative, but focus on functionality and code quality!

---

## Goal
Your task is to create a full-stack URL shortening service. This includes:

- Accepting a long URL and generating a shortened version.
- Retrieving the original URL when given the shortened version.
- Implementing a frontend to interact with the service.
- Building a backend that handles the logic and persistence of URLs.

### Key Features
- **URL Shortening**:
  - Given a long URL (e.g., `https://example.com/some/long/url`), return a shortened URL (e.g., `http://shorturl.com/f4p0d`).
  - Given a shortened URL, return the original long URL.

- **Frontend**:
  - A simple interface where users can input a URL to shorten and retrieve the original URL from a shortened one.

- **Backend**:
  - Handle the URL shortening logic, manage the URL mappings, and store them in a database.

- **Scalability Considerations**:
  - Consider future scalability and how the service might grow to handle more traffic.

- **Deployment Consideration**:
  - Think about how this application would be deployed in a production environment. Use Docker or other deployment tools if you like.

---

## Requirements
### Core Requirements:
1. Implement the URL shortening and retrieval functionality.
2. Design a basic frontend for interacting with the system.
3. Implement a backend to manage the business logic and persist data.
4. Use a database to store URL mappings.
5. Document the decisions you've made, including architectural choices and the technologies used.

### Bonus (Optional):
- Add URL expiration functionality, so shortened URLs can expire after a certain period.
- Include statistics about the shortened URLs (e.g., how many times a shortened URL has been accessed).
- Add authentication, so only logged-in users can shorten URLs.

---

## Suggested Technologies
You are free to use any technology you're comfortable with. Here are some suggestions:

### Frontend:
- **React** or any other modern frontend framework.

### Backend:
- **FastAPI**, **Flask**, **Node.js (Express)** or any backend framework you prefer.

### Database:
- **MongoDB**, **PostgreSQL** or any other database you're comfortable with.

### Deployment:
- If you'd like to demonstrate your deployment skills, you can use **Docker**, **Kubernetes**, **Serverless**, or **Terraform** to showcase how you would handle production deployment.

---

## Evaluation Criteria
- **Code Quality**: Clean, maintainable, and well-structured code.
- **Problem Solving**: How you approach the problem and handle edge cases.
- **Frontend/Backend Integration**: Smooth communication between frontend and backend.
- **Scalability and Design**: Thoughtfulness regarding how the system could scale.
- **Documentation**: Clear and concise documentation for setup and usage.


---

## Avvio

Con Node.js 24, dalla cartella del progetto:

```powershell
npm ci
npm run db:migrate
npm run dev
```

Apri http://127.0.0.1:5173. Vite e il plugin Cloudflare avviano insieme frontend e Worker. In locale non serve un account Cloudflare.

## Struttura e scelte

- `src/client`: React e PrimeReact 10, mantenuti in JavaScript.
- `src/worker`: API e redirect con Hono, in TypeScript.
- `migrations`: schema SQL di D1.

Il form chiama `POST /api/links`. Il Worker accetta URL HTTP/HTTPS, genera cinque caratteri casuali crittografici e riusa il codice per lo stesso URL. Il link breve risponde con redirect 302 e `Cache-Control: no-store`, oppure 404 se non esiste.

Hono semplifica le rotte. D1 conserva codice, URL e data di creazione; query parametrizzate e vincoli univoci evitano duplicati, con al massimo cinque tentativi per un codice libero. TypeScript aiuta a trovare errori di tipo; non sostituisce i controlli sulle richieste.

## Database e verifiche

Apri [Local Explorer](http://127.0.0.1:5173/cdn-cgi/local/explorer), poi DB e tabella links. E incluso negli strumenti Cloudflare. I dati locali restano in `.wrangler/`, esclusa da Git.

`npm run typecheck` verifica i tipi del Worker e della configurazione Vite. `npm run build` esegue il controllo dei tipi e compila l'app.

Per la prova manuale, crea un link, aprilo e reinserisci lo stesso URL: deve restituire lo stesso codice. Dopo un riavvio il link deve funzionare ancora.

Il deploy previsto usa Workers e D1, con frontend e API sullo stesso dominio. L'ID D1 in `wrangler.jsonc` e un segnaposto locale: prima del deploy serve un database Cloudflare reale.

SHA-256 con fallback casuale, cache, scadenza, contatore e autenticazione restano sviluppi successivi. Le scelte sono raccolte in [implementation-scelte.md](implementation-scelte.md).
