# Vorlage: American Video Store Neon

## Visuelle These

Eine sorgfältig kuratierte amerikanische Videothek der späten Achtziger nach Ladenschluss: dunkles Violett, leuchtende Reklame, VHS-Regale und ein Hauch Arcade – detailreich, aber erwachsen statt verspielt.

## Prinzipien

1. Neon ist Signal, nicht Fläche: Pink und Cyan markieren Auswahl, Fokus und Handlung.
2. Dunkel mit Tiefe: violettschwarze Ebenen ersetzen flaches Schwarz.
3. Reklame in der Kopfzeile: der zentrierte Schriftzug darf leuchten; Inhalte bleiben ruhig.
4. Analoge Spur: feines Raster und leicht kantige Cover zitieren VHS, ohne Lesbarkeit zu mindern.
5. Zwei Akzentrollen: Pink steht für Aktion und Energie, Cyan für Auswahl, Navigation und Präzision.

## Tokens

| Rolle | Wert | Einsatz |
|---|---:|---|
| Hintergrund | `#080812` | App-Fläche |
| Oberfläche | `#11101d` | Sidebar, Tabelle, Dialoge |
| erhöhte Oberfläche | `#19162a` | Popover und Gruppen |
| Text | `#fff7e8` | Primärtext, warm statt reinweiß |
| gedämpfter Text | `#aaa4bd` | Metadaten |
| Linie | `#34304a` | Grenzen |
| Neon-Pink | `#ff4f9a` | Primäraktion, Hover, Energie |
| Neon-Cyan | `#28ded1` | Auswahl, Fokus, Links |
| Gefahr | `#ff6478` | destruktive Aktionen |

Glows bleiben lokal und niedrig deckend. Große Textflächen erhalten niemals Leuchtschatten.

## Typografie

- Marke: fotografisches Neonschild mit sichtbaren Röhren, Halterungen, Kabeln und realem Lichtspill; als responsiv beschnittenes Bild statt simuliertem CSS-Text.
- Große redaktionelle Titel: EB Garamond, kursiv, kräftig.
- Bedienung und Metadaten: Source Sans 3.
- Navigation: kleine Versalienwirkung über Uppercase und moderate Laufweite.
- Labels: helles Lavendel; mindestens `#d2cada` auf `#12101d`.

## Layout

- Desktop-Kopfzeile: übergroße leuchtende Script-Marke exakt zentriert; darunter Navigation links, Suche mittig und Werkzeuge rechts. Die Unterkante löst sich als Lichtverlauf auf.
- Mobile Kopfzeile: Marke in eigener oberer Zeile, Navigation und Werkzeuge darunter.
- Cover-Raster und Archivstruktur bleiben identisch zum Standardtheme.
- Die Genres stehen auf Desktop als vertikales, beim Seitenlauf feststehendes Regal links neben dem Filmraster; acht Hauptgenres bleiben sichtbar, weitere werden gezielt aufgeklappt. Wird das Regal höher als der verfügbare Raum, scrollt es unabhängig.
- Hintergründe nutzen nur subtile radiale Lichtfelder und ein sehr schwaches 4-px-Raster.

## Komponenten und Microinteractions

- Cover: 4-px-Radius, dunkle Kontur, leichter VHS-Versatz; Hover mit kleinem Hub und lokalem Pink-Glow.
- Aktive Chips: Cyan gefüllt, dunkler Text. Primärbuttons: Pink gefüllt.
- „Romantik“ bündelt die Archivgenres Romantik, Liebesfilm und Erotik zu einem gemeinsamen Filter.
- Die acht Hauptgenres reagieren nach der Auswahl mit zwei zurückhaltenden Licht- oder Requisitenakzenten im Hintergrund. Diese verändern niemals die etablierten UI-Farben, Cover oder Fokuszustände; „Alle Filme“ bleibt neutral.
- Genre-Akzente blenden weich ein, werden bei reduzierter Bewegung statisch und verschwinden im erzwungenen Kontrastmodus vollständig.
- Tabellen und Archive: violettschwarze Ebenen; aktive Projektzeile mit linker Pink-Kante.
- Dialoge: warme Überschriften, helle Labels, dunkle Eingaben und Cyan-Fokus.
- Dauer: 180–220 ms ease-out; keine großen Zooms oder flackernden Effekte.

## Cursor-System

Alle Cursor werden als kleine eingebettete SVG-Data-URIs geliefert; Systemfallbacks sind Pflicht.

| Zustand | Motiv | Hotspot | Fallback |
|---|---|---:|---|
| Standard | dunkler Pfeil, Cyan-Kontur, Pink-Innenlinie | `4 3` | `default` |
| Link/Control | reduzierte Pink-Hand, Cyan-Funkeln | `7 3` | `pointer` |
| Texteingabe | Cyan-I-Beam mit dunkler Außenkante | `9 15` | `text` |
| Drag | offene Cyan-Hand | `11 8` | `grab` |
| Grabbing | geschlossene Pink-Hand | `13 9` | `grabbing` |

Cursor bleiben 18–28 px groß. Disabled Controls nutzen bewusst den vertrauten `not-allowed`-Cursor.

## QA-Checkliste

- Wechsel ist per Button, Tastatur und Screenreader verständlich (`aria-pressed`, dynamisches Label).
- Auswahl bleibt nach Reload über `localStorage` erhalten; Early-Init verhindert helles Aufblitzen.
- Kein Neon-Selektor wirkt ohne `data-theme="neon"`.
- Alle eingebetteten Cursor besitzen Hotspot und Systemfallback.
- Labels, TMDB-Titel, Hilfetexte und Treffer erreichen auf dunklen Flächen ausreichenden Kontrast.
- Textauswahl ist gut erkennbar; Scrollbars bleiben dezent, aber sichtbar.
- Fokus ist cyan und unabhängig vom Pink-Hover erkennbar.
- Dialoge, Drawer, Tabellen und leere Zustände wurden in beiden Themes geprüft.
- 320, 768, 1024 und 1440 px sowie hohe Browser-Zoomstufen prüfen.
- `prefers-reduced-motion` respektieren und Bedienung ohne Hover testen.
