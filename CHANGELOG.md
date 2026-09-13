# Changelog

## 0.17.0 – 2026-09-13
- Wikidata-Abgleich ergänzt IMDb, TMDB, EIDR, ISAN, Letterboxd und Rotten Tomatoes automatisch.
- Letterboxd- und Rotten-Tomatoes-IDs im kompakten ID-Block ergänzt.

## 0.16.0 – 2026-09-13

- Identifikationsbereich auf eine einzige Überschrift und kompakte Aktionszeile verdichtet.
- Jede Kennung wird nun in einer einzigen, platzsparenden Zeile mit halbbreitem Eingabefeld dargestellt.
- Die separate TMDB-Suche im Kopf des Bereichs entfällt; sie sitzt nun direkt hinter der TMDB-ID-Zeile.
- Filminformationen um TMDB-, IMDb-, Wikidata-, TVDB-, EIDR- und ISAN-ID erweitert.
- Kennungen werden untereinander mit grünem Vorhanden-Haken angezeigt und können manuell gepflegt werden.
- Über „IDs automatisch ergänzen“ werden die bei TMDB verfügbaren externen Kennungen gesammelt übernommen.

## 0.15.0 – 2026-09-13

- Jede eigene Fassung kann als „Frei zugänglich“ oder „Privates Archiv · erworben“ gekennzeichnet werden.
- Bestehende und neu angelegte Fassungen beginnen aus Datenschutzgründen als privat.
- Der Projektexport fragt zwischen vollständigem und öffentlichem Export ab und zeigt vorab die Zahl der teilbaren Filme und Fassungen.
- Öffentliche Exporte entfernen private Fassungen, ihre Links sowie Filme ohne mindestens eine frei zugängliche Fassung vollständig.
- Zusätzlich steht für jede Fassung der Zugriffstyp „Zugänglich mit Passwort“ mit einem darunterliegenden Passwortfeld zur Verfügung.
- Passwortgeschützte Fassungen werden wie private Fassungen behandelt und nie in den öffentlichen Export übernommen.
- Beim Öffnen eines passwortgeschützten Filmlinks wird das hinterlegte Passwort automatisch in die Zwischenablage kopiert.

## 0.14.1 – 2026-09-13

- Projekt, Playlist, Anordnung, Originaltitel, Sprachen, Genre und Suchtext der Hauptseite werden dauerhaft lokal gespeichert.
- Hauptseite und Archiv verwenden voneinander getrennte Suchzustände.
- Beim Öffnen des Archivs werden zunächst alle Filme des links gewählten Projekts angezeigt; die vorherige Hauptseitenansicht bleibt unangetastet.
- Beim Zurückkehren zur Hauptseite und nach einem Neuladen wird der zuvor gewählte Filterzustand vollständig wiederhergestellt.

## 0.14.0 – 2026-09-13

- Umschaltbares Neon-Theme im Stil einer prototypischen amerikanischen Videothek ergänzt.
- Reduzierter Regenbogen-Schalter oben rechts; die Auswahl bleibt lokal gespeichert.
- Im Neonmodus erscheinen eine neu aufgebaute Kopfzeile mit zentriertem Leuchtschriftzug sowie eigenständige Oberflächen für Entdecken, Archive, Menüs und Dialoge.
- Eigene Neon-Cursor für Navigation, Interaktion, Texteingabe und Filmverschiebung sowie passende Textauswahl und Scrollleisten ergänzt.
- Die Designprinzipien beider Themes liegen als wiederverwendbare Vorlagen im Ordner `design-templates`.
- Das bisherige helle Arthouse-Theme bleibt vollständig erhalten.
- Den zentralen Schriftzug als großen, klassischen Script-Neonschriftzug mit Cyan-Unterstrich gestaltet und die harte Kopfzeilengrenze in einen Lichtverlauf aufgelöst.
- Die Suche im Neonmodus mittig unter dem Schriftzug angeordnet; Navigation und Werkzeuge flankieren sie ohne Überlagerung.
- Den simulierten CSS-Schriftzug durch ein fotografisches Neonschild mit realen Röhren, Halterungen und Lichtspill ersetzt.
- Das Neonschild vom oberen Fensterrand gelöst und den Cyan-Lichtschein an seiner Unterkante weich in die Kopfzeile ausgeblendet.
- Den Bildausschnitt des Neonschilds erhöht, damit der vollständige Schriftzug statt einer leeren dunklen Fläche sichtbar bleibt.
- Das Schildfoto bis an den oberen Fensterrand gezogen; der zuvor sichtbare separate schwarze Streifen entfällt.
- Die verbleibende dunkle Fotozone oberhalb der Röhren mit violett-pinkem Lichtspill an den Fensterhintergrund angeglichen.
- Genres im Neonmodus als vertikale Navigation links neben das Filmraster verschoben.
- Komödie, Science Fiction, Thriller, Abenteuer, Fantasy, Action, Horror und Romantik bleiben immer sichtbar; weitere Genres lassen sich aufdecken.
- Der Filter „Romantik“ umfasst auch Liebesfilm und Erotik.
- Die redundante Überschrift „Alle Filme“ über dem Filmraster wird im Neonmodus ausgeblendet.
- Das Genreregal bleibt beim Scrollen des Filmrasters im Neonmodus sichtbar und kann bei Bedarf unabhängig scrollen.
- Die acht Hauptgenres erhalten im Neonmodus eigene subtile Raumakzente – von Schleim und Kratzspuren bis zu Laser, Portallicht und Konfetti.
- Genreakzente bleiben hinter dem Katalog, respektieren reduzierte Bewegung sowie erzwungene Kontraste und verändern keine funktionalen UI-Farben.
- Genreknöpfe weisen ihren Auswahlzustand nun zusätzlich semantisch über `aria-pressed` aus.

## 0.13.3 – 2026-09-12

- „Originaltitel anzeigen“ ersetzt nun den fett gesetzten Kartentitel, statt eine zusätzliche Titelzeile einzublenden.

## 0.13.2 – 2026-09-12

- Checkbox „Originaltitel anzeigen“ unter „Auswahl & Anordnung“ ergänzt.
- Aktivierte Originaltitel erscheinen auf den Filmkarten; identische Titel werden nicht doppelt dargestellt.

## 0.13.1 – 2026-09-12

- Das Feld „Titel“ unter „Meine Fassungen“ heißt nun „Quelle“; Daten und Verhalten bleiben unverändert.

## 0.13.0 – 2026-09-12

- Filme lassen sich in der Archivansicht am Cover oder Titel greifen und auf ein anderes Projekt ziehen.
- Gültige Zielprojekte werden beim Ziehen dezent hervorgehoben; nach dem Ablegen wird der vollständige Filmeintrag verschoben.

## 0.12.3 – 2026-09-12

- Den unnötigen vertikalen Abstand zwischen Filmtitel und verlinkter Regiezeile wieder entfernt.

## 0.12.2 – 2026-09-12

- Regienamen unter den Filmcovern sind anklickbar und filtern die Entdecken-Ansicht nach der vollständigen Regie.
- Zu lange Regienamen werden automatisch auf das letzte Namenswort verkürzt, bevor ein Zeilenumbruch entsteht.

## 0.12.1 – 2026-09-12

- Die Suche bleibt nun in der Archivansicht und filtert dort die Filmtabelle des aktiven Projekts.
- Für eine leere Trefferliste erscheint eine eigene Rückmeldung.

## 0.12.0 – 2026-09-12

- Sprachfilter als Checkboxliste im Seitenmenü „Auswahl & Anordnung“ ergänzt.
- Verfügbare Sprachen werden aus den eigenen Filmfassungen ermittelt und nach Häufigkeit sortiert.
- Mehrere ausgewählte Sprachen filtern gemeinsam nach Filmen, die mindestens eine davon enthalten.

## 0.11.6 – 2026-09-12

- Maximale Länge der Playlistbeschreibung von 400 auf 800 Zeichen verdoppelt.

## 0.11.5 – 2026-09-12

- Sammlungsnummer unter den Filmcovern typografisch an die graue Metazeile angepasst.

## 0.11.4 – 2026-09-12

- Anordnung nach Sammlungsnummer ergänzt.
- Bei dieser Anordnung wird die verwendete Sammlungsnummer zusätzlich unter dem Filmcover angezeigt.

## 0.11.3 – 2026-09-12

- Schlagwörter vollständig aus Filmbearbeitung, Detailansicht, TMDB-Übernahme und Filmsuche entfernt.
- Bereits gespeicherte alte Schlagwörter werden nicht mehr für Suchergebnisse berücksichtigt.

## 0.11.2 – 2026-09-12

- Sammlungsnummernfeld in der Playlist-Checkliste in dieselbe Zeile wie die Sammlung gesetzt.
- Nummernfeld bleibt unabhängig vom Haken editierbar und akzeptiert maximal sechs Buchstaben oder Ziffern.

## 0.11.1 – 2026-09-12

- Playlist-Zuordnungen um eine manuelle Sammlungsnummer mit maximal sechs Buchstaben oder Ziffern erweitert.
- Bestehende Zuordnungen bleiben kompatibel und erhalten zunächst eine leere Sammlungsnummer.

## 0.11.0 – 2026-09-12

- Dritten Bearbeitungstab „Playlisten“ ergänzt.
- Filme lassen sich per Checkliste mehreren Playlists hinzufügen oder daraus entfernen.
- Playlistzuordnungen werden gemeinsam mit dem Filmeintrag gespeichert und beim Löschen bereinigt.

## 0.10.2 – 2026-09-12

- Zufällige Filmanordnung ergänzt; die Mischung bleibt während der Sitzung stabil und wird beim Neuladen neu erzeugt.

## 0.10.1 – 2026-09-12

- Unter den Filmcovern wird neben dem Jahr nun die Regie statt des Genres angezeigt.

## 0.10.0 – 2026-09-12

- Animiertes Seitenmenü für Auswahl und Anordnung in der Entdecken-Ansicht ergänzt.
- Projektauswahl aus der Filmfläche in das neue Seitenmenü verschoben.
- Playlistfilter und Sortierung nach Alphabet, Jahr oder Genre ergänzt.

## 0.9.1 – 2026-09-12

- Originaltitel und Produktionsländer als eigene Filminformationen ergänzt und über TMDB befüllt.
- Detailansicht zeigt den Originaltitel als Haupttitel sowie die Länder an.
- Jede eigene Fassung besitzt einen frei änderbaren Titel; Fassungstitel sind über die globale Filmsuche auffindbar.

## 0.9.0 – 2026-09-12

- Filmbearbeitung in die Tabs „Filminformationen“ und „Meine Fassungen“ aufgeteilt.
- Pro Film können mehrere eigene Fassungen mit Bezeichnung, Link, Sprachen, Auflösung, Qualität und Status gespeichert werden.
- Bestehende einzelne Film-Links werden automatisch als erste Fassung weiterverwendet.
- Detailansicht bietet jede verfügbare Fassung mit ihren technischen Angaben separat zum Öffnen an.

## 0.8.2 – 2026-09-12

- Zeichenbegrenzung des Beschreibungsfelds entfernt, damit vollständige TMDB-Beschreibungen übernommen werden können.

## 0.8.1 – 2026-09-12

- Schauspieler als eigene Filminformation ergänzt und in die Filmsuche aufgenommen.
- TMDB übernimmt die wichtigsten Darsteller aus den Credits.
- Schlagwörter werden bei einer TMDB-Zuweisung ausschließlich aus den TMDB-Keywords befüllt.

## 0.8.0 – 2026-09-12

- TMDB-Suche direkt in den Dialog zum Anlegen und Bearbeiten von Filmen integriert.
- Ausgewählte Treffer übernehmen Titel, Jahr, Laufzeit, Regie, Genres, Beschreibung, Cover, FSK und verfügbare YouTube-Trailer.
- Bereits hinterlegte Film-Speicherlinks bleiben bei der Metadatenübernahme erhalten.
- TMDB-Verknüpfung wird am Film gespeichert; der API Read Access Token bleibt ausschließlich lokal.
- Vorhandener TMDB-Token aus Time Map wird nach Möglichkeit automatisch übernommen.

## 0.7.0 – 2026-09-12

- Programmordner in `atlas/videothek` umbenannt.
- JavaScript-, Stylesheet-, Import-, Manifest- und Favicon-Dateien technisch auf „Videothek“ umgestellt.
- Interne Namensräume, Speicherkennungen, Exportformat und Werkzeugnamen entsprechend umbenannt.
- Bestehende lokale Daten und ältere Projektexporte werden automatisch übernommen.

## 0.6.7 – 2026-09-12

- App-Bezeichnung durchgängig in „Videothek“ geändert.
- Bezeichnung in der App, der Atlas-Übersicht und allen sichtbaren Hinweisen aktualisiert.
- Bestehende Speicher- und Importdaten bleiben aus Kompatibilitätsgründen lesbar.

## 0.6.6 – 2026-09-12

- Suchfeld in der Kopfzeile größer und visuell präsenter gestaltet.
- Eigenes dezentes Suchsymbol, fein abgestufte Fläche und Schatten ergänzt.
- Ruhigen Akzentzustand bei Tastatur- und Mauseingabe beibehalten.

## 0.6.5 – 2026-09-12

- Zahnrad-/Eigenschaftsknopf oben rechts entfernt.
- Archive bleiben über die gleichnamige Hauptnavigation erreichbar.

## 0.6.4 – 2026-09-12

- Mehr Abstand zwischen Kopfzeile und Genrebereich geschaffen.
- Dezenten Schalter zum Ein- und Ausblenden der vollständigen Genreliste ergänzt.
- Beim Ausblenden wird ein aktiver Genrefilter neutral zurückgesetzt.

## 0.6.3 – 2026-09-12

- Vogel-Icon in der Kopfzeile auf die appübergreifende Atlas-Größe von 48 × 48 Pixeln gebracht.
- Auf schmalen Ansichten wird das Icon wie in den anderen Apps auf 44 × 44 Pixel verkleinert.

## 0.6.2 – 2026-09-12

- Genre-Chips verkleinert und mit automatischem Zeilenumbruch versehen.
- Genrebereich im geschlossenen Zustand auf drei Zeilen begrenzt.
- Zusätzliche Genres lassen sich nach unten aus- und wieder einklappen.

## 0.6.1 – 2026-09-12

- Projektauswahl und Titelanzahl dynamisch an der rechten Kante des letzten Covers der ersten Reihe ausgerichtet.
- Ausrichtung reagiert auf Fenstergröße, Suche, Filter und Projektwechsel.

## 0.6.0 – 2026-09-12

- Verwaltungsmodus von „Maschinenraum“ in „Archive“ umbenannt.
- Projekte und Playlisten als gleichwertige Archivbereiche angelegt.
- Playlisten können erstellt, ausgewählt und gelöscht werden.

## 0.5.7 – 2026-09-12

- Titelanzahl über der Projektauswahl angeordnet.
- Titelanzahl und Auswahlmenü an einer gemeinsamen rechten Kante ausgerichtet.

## 0.5.6 – 2026-09-11

- Projektauswahl aus dem dominanten Kopfbereich entfernt.
- Projektauswahl kompakt rechts neben der Titelanzahl angeordnet.

## 0.5.5 – 2026-09-11

- Automatische Trailer-Wiedergabe im Cover wieder entfernt.
- Fokusdarstellung der Suchleiste auf eine einzelne, ruhige Kontur reduziert.
- Rechts überlagerndes Suchsymbol und Rechtschreibmarkierung in der Filmsuche entfernt.

## 0.5.4 – 2026-09-11

- Trailer-Vorschau auf Filmcovern ergänzt.
- Trailer starten nach dem Puffern beim Mouseover stumm und stoppen beim Verlassen des Covers.
- Direkte Videolinks sowie YouTube- und Vimeo-Links werden unterstützt.
- YouTube-Vorschau mit Player-Steuerung und expliziter Herkunftskennung stabilisiert.
- Fehlerseiten des Videoplayers werden nicht mehr über dem Filmcover eingeblendet.

## 0.5.3 – 2026-09-11

- Trailer-Link als eigene Filmeigenschaft ergänzt.
- Trailer direkt aus der Filmdetailansicht aufrufbar.
- Trailer-Feld bleibt in exportierten und importierten Projekten erhalten.

## 0.5.2 – 2026-09-11

- Kompakte Covergröße der Suchergebnisse einheitlich auf den gesamten Entdecken-Katalog übertragen.
- Dynamische Größenänderung zwischen Hauptanzeige und Suche entfernt.

## 0.5.1 – 2026-09-11

- Großen Projekttitel im Entdecken-Modus entfernt und Projektauswahl verdichtet.
- Gestaltung vollständig auf eine klare serifenlose Typografie umgestellt.
- Filmcover mit einem dezenteren, wertigen Schatten versehen.
- Kompakte Covergrößen werden nur während einer aktiven Suche verwendet; der normale Katalog bleibt großzügiger.
- Farbflächen und Oberflächen weiter beruhigt und neutralisiert.

## 0.5.0 – 2026-09-11

- Videothek als helle, wohnliche Arthouse-Edition neu gestaltet.
- Farbwelt auf Elfenbein, Tinte, Burgunder und dezentes Messing umgestellt.
- Filmkarten, Navigation, Maschinenraum, Tabellen, Menüs und Dialoge in ein gemeinsames redaktionelles System überführt.
- Fokuszustände, Touchgrößen und reduzierte Bewegung verbessert.

## 0.4.8 – 2026-09-11

- Einstellige Stundenangaben wie `1:42:30` werden ohne Validierungsfehler akzeptiert.
- Führende Nullen bei der Stundenanzeige sind optional und werden beim Speichern entfernt.

## 0.4.7 – 2026-09-11

- Laufzeiteingabe von Minuten auf das Raster `hh:mm:ss` umgestellt.
- Bestehende numerische Minutenwerte werden beim Bearbeiten automatisch umgerechnet.

## 0.4.6 – 2026-09-11

- Projektspalte und Projektbestand im Maschinenraum unabhängig scrollbar gemacht.
- Auf schmalen, gestapelten Ansichten bleibt der natürliche Seitenscroll erhalten.

## 0.4.5 – 2026-09-11

- Standardprojekt „Filmarchiv“ geleert.
- Die vier ursprünglichen Demofilme werden bei unverändertem Altbestand einmalig entfernt; eigene Einträge bleiben erhalten.

## 0.4.4 – 2026-09-11

- Projektauswahl im Entdecken-Modus um „Alle Projekte“ ergänzt und als Standard festgelegt.
- Suche, Genre-Filter und Filmdetails arbeiten nun projektübergreifend.

## 0.4.3 – 2026-09-11

- Große Bühne für den ersten Film aus dem Entdecken-Modus entfernt.
- Der Katalog beginnt nun unmittelbar mit Projektwahl, Filtern und Filmkarten.

## 0.4.2 – 2026-09-11

- Redundante Titelbeschriftung innerhalb der Cover im Entdecken-Modus entfernt.

## 0.4.1 – 2026-09-11

- Jede Projektzeile besitzt nun ein eigenes Drei-Punkte-Menü mit „Löschen“.
- Vor dem Löschen werden Projektname und Filmzahl bestätigt; das letzte verbleibende Projekt ist geschützt.

## 0.4.0 – 2026-09-11

- Projektspalte verbreitert und Projektbestand kompakter begrenzt.
- Projektaktionen in ein Drei-Punkte-Menü neben der Überschrift verschoben.
- „Projekt hinzufügen“ als ausgeschriebene Schaltfläche unter der Projektliste ergänzt.
- Für Copy-Paste-Titel ohne übertragene URL wird ein deutlich gekennzeichneter YouTube-Suchlink erzeugt.

## 0.3.0 – 2026-09-11

- Copy-Paste-Import für vollständig kopierte Google-/YouTube-Bibliotheksseiten ergänzt.
- Bereinigung typischer Navigations- und Statuszeilen sowie Dublettenerkennung umgesetzt.
- Kontrollierbare Vorschau mit Auswahl einzelner erkannter Titel vor dem Import ergänzt.

## 0.2.0 – 2026-09-11

- Stapelimport für Google-TV-/YouTube-Bibliotheken als CSV oder JSON ergänzt.
- Flexible Feldzuordnung für deutsche und englische Exportspalten umgesetzt.
- Dublettenerkennung und Importbericht ergänzt.
- Jeder Bibliotheksimport erzeugt ein eigenes Videothek-Projekt mit Herkunftsangaben.

## 0.1.0 – 2026-09-11

- Erste Videothek-Version mit Streaming-Ansicht und Maschinenraum.
- Lokale Projekt- und Filmverwaltung ergänzt.
- JSON-Import und -Export für einzelne Projekte umgesetzt.
- Bearbeitbare Film-, Cover- und Speicherlinks ergänzt.

