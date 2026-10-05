# Videothek

Videothek ist eine lokale, projektbasierte Filmdatenbank für Metadaten und Verweise auf externe Speicherorte. Die Anwendung speichert keine Filmdateien.

Die App ist Teil der Ziselin-Werkzeugfamilie und läuft ohne Build-Schritt als statische Webanwendung.

## Lokal starten

Den Ordner über einen lokalen HTTP-Server bereitstellen und `index.html` öffnen.

## Datenschutz

Filmbestände und persönliche Fassungsdaten werden im lokalen Browser-Speicher abgelegt. Externe Anfragen erfolgen nur für ausdrücklich genutzte Dienste wie TMDB, Wikidata oder eingebettete Trailer.

## Zentraler TMDB-Zugang

Die öffentliche App ruft TMDB über `https://neon-v.com/api/tmdb` auf. Die Route wird von dem Cloudflare Worker in `worker/tmdb-proxy.js` bedient; der TMDB Read Access Token wird niemals an den Browser ausgeliefert.

Einmalige Bereitstellung:

1. Die DNS-Zone `neon-v.com` in Cloudflare verwalten und Wrangler anmelden.
2. `npx wrangler secret put TMDB_READ_ACCESS_TOKEN` ausführen und den TMDB Read Access Token eingeben.
3. Den Worker mit `npx wrangler deploy` veröffentlichen.

Der Worker akzeptiert ausschließlich die von der Videothek benötigten lesenden Film- und Serienendpunkte, cached erfolgreiche Antworten und lässt keine frei wählbaren Ziel-URLs zu. Ein bereits lokal gespeicherter persönlicher Token bleibt als Entwicklungsfallback verwendbar.
