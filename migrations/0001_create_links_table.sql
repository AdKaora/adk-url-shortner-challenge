-- todo nella futura 0002_add_expiration_and_access_count.sql, sempre nella tabella links
-- ALTER TABLE links ADD COLUMN expires_at INTEGER;
-- ALTER TABLE links ADD COLUMN access_count INTEGER NOT NULL DEFAULT 0;

-- expires_at in secondi unix, null se il link non scade
-- il worker controllera ora server >= expires_at a ogni lettura, anche dalla cache
-- se scaduto rispondere 410 e conservare il record per non riutilizzare il codice

-- incrementare access_count = access_count + 1 solo per i get con redirect valido
-- escludere head, link inesistenti e scaduti; sono richieste, non utenti unici

CREATE TABLE links (
  code TEXT PRIMARY KEY NOT NULL,
  url TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
