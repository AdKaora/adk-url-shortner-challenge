import { Hono } from 'hono';
import { methodNotAllowed } from 'hono/method-not-allowed';
import { createLink, getLink } from './links.ts';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use(methodNotAllowed({ app }));

app.post('/api/links', async (context) => {
  // valido anche nel backend, senza visitare la destinazione
  let url;
  try {
    const body = await context.req.json<{ url: string }>();
    url = new URL(body.url.trim());
    if (!['http:', 'https:'].includes(url.protocol)) {
      return context.json({ error: 'usa un indirizzo HTTP o HTTPS' }, 400);
    }
  } catch {
    return context.json({ error: 'inserisci un URL valido' }, 400);
  }

  const link = await createLink(url.href, context.env.DB);
  if (!link) {
    return context.json({ error: 'Non è stato possibile creare il codice' }, 503);
  }
  return context.json(link, 201);
});

app.get('/:code', async (context) => {
  const link = await getLink(context.req.param('code'), context.env.DB);
  if (!link) {
    return context.notFound();
  }

  // il browser deve tornare al worker per future scadenze e statistiche
  context.header('Cache-Control', 'no-store');
  return context.redirect(link.url, 302);
});

app.notFound((context) => context.text('Link non trovato', 404, { 'Cache-Control': 'no-store' }));

// gli errori del db restano nel log, il form riceve un messaggio generico
app.onError((error, context) => {
  console.error(error);
  return context.json({ error: 'Servizio non disponibile, riprova' }, 500);
});

export default app;
