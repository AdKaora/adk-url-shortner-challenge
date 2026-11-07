Deploy pubblico su Cloudflare

accesso

Serve un account Cloudflare. Comandi dalla cartella del progetto, dopo npm ci.

npx wrangler login


db online

npx wrangler d1 create adk-url-shortener --update-config=false

Creare il database una sola volta. In wrangler.jsonc sostituire database_id con l'ID restituito da Cloudflare, mantenendo il binding DB

Il database online e separato da quello locale. I dati locali non vengono copiati


pubblicare

npm run build

npx wrangler d1 migrations apply DB --remote --config wrangler.jsonc

npx wrangler deploy

build controlla i tipi e compila frontend e Worker. Le migrazioni preparano il database online, deploy pubblica l'app

Aprire l'indirizzo workers.dev restituito da Wrangler e provare a creare e aprire un link

Per gli aggiornamenti ripetere questi tre comandi, anche dopo modifiche a wrangler.jsonc
