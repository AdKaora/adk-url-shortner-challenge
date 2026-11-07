// import { randomInt } from 'node:crypto'; TODO future worker 

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// mappe sono temporanee
// byUrl ritrova il codice dello stesso url; byCode controlla i codici occupati
// nel worker futuro usero una tabella d1 con codice e url univoci         
// ricerca e salvataggio passeranno al db, che impedirà duplicati anche tra richieste contemporanee
const byUrl =  new Map();
const byCode = new Map();
function randomCode() {
  let code = '';
  for (let index = 0; index < 5; index += 1) {
    // nel worker  randomInt crittografico
    // code += alphabet[randomInt(alphabet.length)];
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    code += alphabet[randomIndex];                                     
  }
  return code;
} 

export async function createLink(value) {
  const parsedUrl = new URL(value.trim());
  if (!['http:',  'https:'].includes(parsedUrl.protocol)) {
    throw new Error('usa un indirizzo HTTP o HTTPS');
  }
  const url = parsedUrl.href;
  const existingCode = byUrl.get(url);
  if (existingCode !== undefined) {
    return { url, code: existingCode };
  }
  // TODO usare sha256 per il primo cod per semplificare retrival 
  // mantenere il random se quel codice è già occupato
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const code = randomCode();

     if (!byCode.has(code)) {
      byCode.set(code, url);
      byUrl.set(url, code);
      return { url, code };
     }
  }
  throw new Error('Non è stato possibile creare il codice');
}
