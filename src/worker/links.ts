import { randomInt } from 'node:crypto';

type Link = {
  url: string;
  code: string;
};

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// randomInt crittografico, con indici da 0 a 61
function randomCode() {
  let code = '';
  for (let index = 0; index < 5; index++) {
    code += alphabet[randomInt(alphabet.length)];
  }
  return code;
} 

// riuso lo stesso url; bind passa i valori al db senza inserirli nel testo SQL
export async function createLink(url: string, db: D1Database) {
  const byUrl = db.prepare('SELECT url, code FROM links WHERE url = ?').bind(url);
  const existing = await byUrl.first<Link>();
  if (existing) {
    return existing;
  }

  // il db controlla i duplicati senza sovrascrivere i link esistenti
  // todo usare sha256 per il primo candidato, mantenendo il fallback casuale
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = randomCode();
    const inserted = await db.prepare(
      'INSERT INTO links (code, url) VALUES (?, ?) ON CONFLICT DO NOTHING'
    ).bind(code, url).run();

    if (inserted.meta.changes === 1) {
      return { url, code };
    }

    // un'altra richiesta potrebbe aver appena salvato lo stesso url
    const saved = await byUrl.first<Link>();
    if (saved) {
      return saved;
    }
  }
  return null;
}

export function getLink(code: string, db: D1Database) {
  return db.prepare('SELECT url, code FROM links WHERE code = ?').bind(code).first<Link>();
}
