URL PIU PICCOLO

APPUNTI DI PROGETTO: SCELTE INIZIALI E PASSAGGI DI IMPLEMENTAZIONE.

 Full Stack Developer Test - demonstrate your skills in both frontend and backend development, as well as your ability to structure a scalable application

 be creative, but focus on functionality and code quality!



- Accepting a long URL and generating a shortened version.

  VALIDARE URL ASSOLUTI HTTP/HTTPS NEL BACKEND, LIMITARE LA LUNGHEZZA E RIFIUTARE CREDENZIALI NELL'URL. NON VISITARE LA DESTINAZIONE. FORMATO VALIDO NON SIGNIFICA SITO SICURO: NESSUN CONTROLLO ANTIPHISHING O ANTIMALWARE NELLA BASE.
- Retrieving the original URL when given the shortened version.
 INTERPRETAZIONE PER LA PRIMA VERSIONE: APRIRE IL LINK BREVE E RAGGIUNGERE L'URL ORIGINALE TRAMITE REDIRECT. NESSUN FORM SEPARATO DI RECUPERO.
- Implementing a frontend to interact with the service.

  INTERFACCIA BASE: INSERIMENTO URL, RISULTATO E LINK BREVE DA APRIRE.
  REACT. PRIME REACT DA VALUTARE.
- Building a backend that handles the logic and persistence of URLs.
  CLOUDFLARE PER FRONTEND STATICO, BACKEND E DATABASE
  WORKER PER LE RICHIESTE, D1 PER SALVARE CODICE E URL

### Key Features
- **URL Shortening**:
  - Given a long URL (e.g., `https://example.com/some/long/url`), return a shortened URL (e.g., `http://shorturl.com/f4p0d`).

    CODICE SEMPRE DI 5 CARATTERI ALFANUMERICI BASE62, DISTINGUENDO MAIUSCOLE E MINUSCOLE. PRIMO CANDIDATO DERIVATO DALL'HASH SHA-256 DELL'URL NORMALIZZATO. SE IL CODICE APPARTIENE A UN ALTRO URL, FALLBACK CON GENERATORE CASUALE CRITTOGRAFICO, SEMPRE DI 5 CARATTERI. MASSIMO 5 TENTATIVI TOTALI: UNO CON HASH E FINO A QUATTRO CASUALI. SE FALLISCONO PER COLLISIONE, ERRORE CONTROLLATO. MAI SOVRASCRIVERE LINK ESISTENTI.

    HASH RIDOTTO A 5 CARATTERI: COLLISIONI COMUNQUE POSSIBILI. USARE BASE62, NON I PRIMI CINQUE CARATTERI ESADECIMALI DELL'HASH. L'UNICITA' DEI CODICI SALVATI E' GARANTITA DAL VINCOLO NEL DB.

    STESSO URL -> RIUSARE IL CODICE SALVATO, ANCHE SE ASSEGNATO CON FALLBACK CASUALE. CERCARE L'URL ESISTENTE PRIMA DI GENERARE UN NUOVO CODICE. VINCOLO UNIVOCO ANCHE SULL'URL: SE UNA RICHIESTA CONCORRENTE LO HA GIA' INSERITO, RECUPERARE IL SUO CODICE. NORMALIZZAZIONE MINIMA DA DEFINIRE, UGUALE PER HASH, RICERCA E SALVATAGGIO, SENZA ELIMINARE PARAMETRI ARBITRARIAMENTE.
  - Given a shortened URL, return the original long URL.

    CODICE ASSENTE: 404. REDIRECT 302 CON LOCATION E CACHE-CONTROL: NO-STORE, ANCHE IN PREVISIONE DI SCADENZA E STATISTICHE.

- **Frontend**:
  - A simple interface where users can input a URL to shorten and retrieve the original URL from a shortened one.

    ACCORCIAMENTO E APERTURA DEL LINK BREVE PER RAGGIUNGERE LA DESTINAZIONE.

- **Backend**:
  - Handle the URL shortening logic, manage the URL mappings, and store them in a database.

    TABELLA CODICE, URL ORIGINALE, DATA DI CREAZIONE. CODICE COME CHIAVE PRIMARIA NON NULLA, URL UNIVOCO PER IL RIUSO. ASSOCIAZIONE CODICE-URL IMMUTABILE. PRIMA SALVARE, POI RESTITUIRE IL LINK.

- **Scalability Considerations**:
  - Consider future scalability and how the service might grow to handle more traffic.

    IPOTESI: PIÙ LETTURE CHE CREAZIONI, DA MISURARE. CACHE DEL MAPPING DOPO LA BASE FUNZIONANTE. CACHE API LOCALE AL DATA CENTER, SE MANCA IL DATO LEGGERE D1.

- **Deployment Consideration**:
  - Think about how this application would be deployed in a production environment. Use Docker or other deployment tools if you like.

    WORKERS, FRONTEND E API SULLO STESSO DOMINIO. AVVIO LOCALE RIPETIBILE PER CHI VALUTA.

---

## Requirements
### Core Requirements:
1. Implement the URL shortening and retrieval functionality.

    CREARE LINK, RECUPERARE URL, CONTROLLARE REDIRECT.
2. Design a basic frontend for interacting with the system.

   UI ESSENZIALE, COLLEGARE PRIMA IL FLUSSO COMPLETO. LAYOUT DA DEFINIRE

3. Implement a backend to manage the business logic and persist data.

  CREARE UN LINK RECUPERARLO.

4. Use a database to store URL mappings.

   D1

5. Document the decisions you've made, including architectural choices and the technologies used.

   DOCUMENTARE SCELTE, MOTIVAZIONI E LIMITI. DISTINGUERE COSA È IMPLEMENTATO DA COSA RESTA DA FARE.

### Bonus (Optional):
- Add URL expiration functionality, so shortened URLs can expire after a certain period.

  BONUS DOPO LA BASE. CAMPO EXPIRES_AT FACOLTATIVO, ISTANTE UTC. SCADENZA FISSATA ALLA CREAZIONE: IL WORKER CONTROLLA ORA SERVER >= EXPIRES_AT A OGNI RISOLUZIONE, ANCHE DALLA CACHE. LINK SCADUTO: 410. LA SCADENZA RIGUARDA IL LINK BREVE, NON IL SITO DI DESTINAZIONE.

  PER ORA CONSERVARE I RECORD SCADUTI PER NON RIUTILIZZARE I CODICI. PULIZIA DA VALUTARE IN SEGUITO.

- Include statistics about the shortened URLs (e.g., how many times a shortened URL has been accessed).

  BONUS DOPO LA BASE. COLONNA ACCESS_COUNT CON VALORE INIZIALE 0. INCREMENTO ATOMICO NEL DB: ACCESS_COUNT = ACCESS_COUNT + 1, PER OGNI GET VALIDA DA REINDIRIZZARE, ANCHE SU CACHE HIT. NON LEGGERE IL CONTATORE PER POI RISCRIVERLO.

  ESCLUDERE HEAD, CODICI INESISTENTI E LINK SCADUTI. LE RICHIESTE POSSONO INCLUDERE BOT E RIPETIZIONI: NON SONO UTENTI UNICI NE' CONFERME DI VISITA AL SITO DI DESTINAZIONE.

  NESSUNA INTERFACCIA STATISTICHE. VERIFICARE IL CONTEGGIO CON QUERY AL DB E TEST. COSTO: UNA SCRITTURA PER ACCESSO, ANCHE CON LA CACHE. CON IL RIUSO DEL CODICE, GLI ACCESSI ALLO STESSO LINK SI SOMMANO.

  SE IL CONTEGGIO FALLISCE, REGISTRARE L'ERRORE E CONSENTIRE COMUNQUE IL REDIRECT: LE STATISTICHE POSSONO SOTTOSTIMARE GLI ACCESSI.
- Add authentication, so only logged-in users can shorten URLs.

  BONUS SUCCESSIVO. LOGIN VERIFICATO DAL WORKER PER CREARE LINK, REDIRECT PUBBLICO. CON UTENTI O SCADENZE DIVERSE, DEFINIRE SE RIUSARE IL CODICE PER UTENTE E SCADENZA: IL SOLO URL NON BASTA A DISTINGUERE I CASI.


---


STACK LIBERO - TYPESCRIPT E CLOUDFLARE


FE

  REACT, POCHI COMPONENTI E STATO LOCALE. ALTRE LIBRERIE SOLO SE SERVONO. (PRIME)

BE

  PROPOSTA TYPESCRIPT SU WORKERS. CONFRONTO CON EXPRESS, FASTAPI E FLASK NELLA VERSIONE SUCCESSIVA, CON STESSI REQUISITI E TEST.

DB

  D1: TABELLA SEMPLICE, CHIAVE UNIVOCA, SQL. POCA CONFIGURAZIONE SU CLOUDFLARE, MA DIPENDENZA DALLA PIATTAFORMA

devops

  PROPOSTA SERVERLESS CON WORKERS

---

Passaggi di implementazione

Primo commit - struttura e scelte iniziali

Definizione della struttura prevista, separando frontend, backend e database.

- `src/client` per la pagina React.
- `src/worker` per API e redirect.
- `migrations` per lo schema del database.
- `tests` per le verifiche.

Secondo commit - frontend

- React e PrimeReact con tema pronto, per concentrarmi sul funzionamento della pagina.
- Form per inserire l'URL  e mostrare il link breve.
- Prima demo nel browser, con dati in memoria e link dimostrativi.

Terzo commit previsto - Worker

- Collegare il form a `POST /api/links`. Aprire il codice con un redirect 302 e `Cache-Control: no-store`.
- Hono per dichiarare le rotte con `app.post` e `app.get`. Meno  controlli manuali e codice più leggibile, con una dipendenza in più. 
  Generazione casuale crittografica nel backend  5 caratteri e riuso del codice per lo stesso URL
- Prova locale con mappe temporanee. D1 per la persistenza nel passaggio successivo.

Cloudflare per lo shortener

- Un Worker è il codice backend che risponde alle richieste. Creazione del link e redirect sono operazioni brevi, adatte a questo modello.
- Serverless per affidare a Cloudflare la gestione dei server e la distribuzione del codice
- Rete distribuita per eseguire il backend vicino agli utenti. La latenza del database resta da valutare.
- Frontend, Worker e futuro D1 sulla stessa piattaforma. Configurazione più semplice, con il compromesso della dipendenza da Cloudflare.

Cache e bonus dopo il flusso base con database.

Comandi previsti per Worker e D1

- Vite per sviluppare e compilare React. Il plugin Cloudflare avvia anche il Worker sullo stesso indirizzo.
- Wrangler per le migrazioni D1 e il futuro deploy. Non serve un Makefile, i comandi sono in `package.json`.
- JavaScript per tenere il codice semplice. TypeScript resta da valutare, non e ancora stato introdotto.

Avvio dal terminale di VS Code, nella cartella del progetto

 
npm ci
npm run db:migrate
npm run dev

`npm ci` installa le versioni del lockfile. Gli strumenti Cloudflare sono `@cloudflare/vite-plugin` e `wrangler`, nelle devDependencies.

- `npm run dev` esegue `vite --host 127.0.0.1 --port 4177 --strictPort`.
- `npm run db:migrate` esegue `wrangler d1 migrations apply DB --local` e prepara le tabelle.
- `npm test` verifica API e database 
- `npm run build` compila frontend e Worker.
- `npm run check` esegue test e build.

App su http://127.0.0.1:4177. Database su http://127.0.0.1:4177/cdn-cgi/local/explorer, poi DB e tabella links.

Local Explorer e gia incluso negli strumenti Cloudflare, non richiede un installazione separata
dati locali sono in .wrangler/, esclusa da Git. Per la prova locale non serve un account Cloudflare.

Per la persistenza, D1 con query parametrizzate e vincoli univoci su codice e URL. I codici sono ancora casuali, SHA-256  TODO
