# Vorlage: Private Cinémathèque

## Visuelle These

Eine persönliche Filmbibliothek am frühen Abend: ruhig, hell, kultiviert und wohnlich. Die Oberfläche erinnert an Papier, Leinen und ein sorgfältig gesetztes Filmprogramm – niemals an ein technisches Administrationssystem.

## Prinzipien

1. Wärme statt klinischem Weiß: Elfenbein und gebrochene Papierfarben bilden die Basis.
2. Redaktion statt Streaming-Lärm: klare Hierarchie, viel Luft, keine aggressiven Glows.
3. Cover zuerst: Metadaten ordnen sich dem Plakat unter.
4. Dezente Autorität: Burgunder markiert Auswahl und Handlung; Messing bleibt Akzent.
5. Funktionale Ruhe: Schatten, Linien und Bewegung sind wahrnehmbar, aber nie dominant.

## Tokens

| Rolle | Wert | Einsatz |
|---|---:|---|
| Hintergrund | `#f5f4f0` | App-Fläche |
| Oberfläche | `#ffffff` | Karten, Dialoge, Eingaben |
| zweite Oberfläche | `#ecebe7` | Sidebar, Gruppen |
| Text | `#252523` | Primärtext |
| gedämpfter Text | `#74736e` | Metadaten |
| Linie | `#d8d6cf` | Grenzen und Trenner |
| Burgunder | `#753a43` | aktive Zustände, Primäraktion |
| Gefahr | `#9b3d3d` | destruktive Aktionen |

Schatten sind warm-neutral und niedrig deckend. Reines Schwarz wird nur in transparenten Schatten verwendet.

## Typografie

- Bedienoberfläche: Source Sans 3, regulär 400–500.
- Navigation und Buttons: 600–700.
- Titel: Source Sans 3, kompakt und ruhig; keine Versalien über ganze Überschriften.
- Metadaten: kleiner, aber mindestens 0,82 rem und mit ausreichendem Kontrast.

## Layout

- Sticky Kopfzeile mit Marke links, Navigation zentral und Werkzeugen rechts.
- Entdecken nutzt ein großzügiges responsives Cover-Raster.
- Archive teilen Projektspalte und Bestand in unabhängig scrollende Bereiche.
- Dialoge sind fokussierte helle Karten; auf kleinen Screens nahezu vollflächig.
- Abstände folgen grob 4 / 8 / 12 / 16 / 24 / 32 / 48 px.

## Komponenten und Microinteractions

- Cover: kleiner Radius, dünne warme Kante, weicher Schatten; Hover maximal 3–4 px Hub.
- Primärbutton: Burgunder, heller Text; Sekundärbutton neutral.
- Chips: ruhige Kontur, aktive Auswahl eindeutig gefüllt.
- Menüs: helle Popover mit kurzer Einblendung und sichtbarem Fokus.
- Status: matte Tinten-Badges, zusätzlich ausgeschriebener Status.

## Cursor

Das Standardtheme verwendet bewusst die Systemcursor. Diese sind vertraut, plattformgerecht und bilden den zurückhaltenden Charakter der hellen Vorlage ab. Für Controls gelten `pointer`, für Eingaben `text`, für verschiebbare Filme `grab` beziehungsweise `grabbing` und für deaktivierte Controls `not-allowed`. Es werden keine dekorativen Cursor-Assets geladen.

## QA-Checkliste

- Standardtheme erscheint ohne gespeicherte Theme-Wahl unverändert.
- Kontrast für Text und Controls mindestens WCAG AA.
- Fokus ist bei Tastaturnavigation überall sichtbar.
- Cover-Raster funktioniert bei 320, 768, 1024 und 1440 px.
- Archive scrollen desktopseitig unabhängig, mobil als normaler Seitenfluss.
- Dialogaktionen bleiben auf kleinen Höhen erreichbar.
- Hover ist nie die einzige Kennzeichnung einer Funktion.
- Reduzierte Bewegung entfernt dekorative Transitionen.
