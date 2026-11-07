Come eseguire

Sviluppato con Node.js 24 e npm. Wrangler e Vite vengono installati insieme alle dipendenze del progetto. Per lavorare in locale non serve un account Cloudflare.


npm ci

npm run db:migrate

npm run dev



npm ci installa le versioni registrate in package-lock.json.
db:migrate applica le migrazioni mancanti al database locale. dev avvia frontend e Worker insieme

App su http://127.0.0.1:5173

per avvii successivi npm run dev
ripetere db:migrate quando vengono aggiunte migrazioni.


db locale

Aprire http://127.0.0.1:5173/cdn-cgi/local/explorer e selezionare DB, poi links.


D1 conserva i dati in .wrangler/
Lo schema e in migrations/0001\_create\_links\_table.sql. Scadenza e contatore per sviluppi futuri


Funzionamento                                                          

Il form chiama POST /api/links con un JSON contenente url. Il Worker accetta indirizzi HTTP/HTTPS e restituisce url e code con stato 201. Lo stesso URL normalizzato riusa il codice salvato.

Il recupero avviene aprendo il link breve nella barra degli indirizzi. GET /codice risponde con redirect 302 verso l'URL originale e  cache-control: no-store.

URL non valido 400
codice assente 404

metodo non previsto 405

Errori del database 500 
tentativi di generazione esauriti 503 

npm run typecheck

npm run build


build  il controllo dei tipi e compila fe e Worker. 


npm run preview

open at http://127.0.0.1:4173


Se manca la tabella links, eseguire npm run db:migrate

