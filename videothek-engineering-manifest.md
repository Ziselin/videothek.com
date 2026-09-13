# Videothek Engineering Manifest

Videothek ist eine lokale Filmdatenbank innerhalb von Atlas. Die Präsentationsansicht orientiert sich an vertrauten Streaming-Oberflächen; die Archive trennen davon die Pflege von Projekten, Playlisten, Filmdaten und Verweisen.

## Datenprinzip

- Videothek speichert niemals Filmdateien, sondern ausschließlich Metadaten, Cover-Verweise und Links zu externen oder lokalen Speicherorten.
- Projekte besitzen stabile IDs und enthalten ihre Filme als eigenständige Datensätze mit stabilen IDs.
- Browserdaten werden lokal in `localStorage` gehalten. Der Export ist die bewusst übertragbare und archivierbare Sicherung.
- Importierte Projekte erhalten neue IDs, damit bestehende Projekte und Filme nicht stillschweigend überschrieben werden.
- Google-TV-/YouTube-Exporte können als CSV oder JSON stapelweise in ein neues Projekt importiert werden. Der Import ordnet deutsche und englische Feldnamen zu und überspringt identische Einträge innerhalb derselben Datei.
- Alternativ verarbeitet Videothek vollständig kopierte Seitentexte. Vor dem Schreiben eines Projekts wird eine auswählbare Titelliste angezeigt, damit Fehlinterpretationen aus Navigation oder Seitentext entfernt werden können.
- Unbekannte Felder eines importierten Projekts bleiben beim erneuten Export erhalten, soweit das Projektobjekt nicht in einer Bearbeitung ersetzt wird.

## Projektformat

Exportdateien verwenden den Umschlag `videothek-project`, Version 1. Der Schlüssel `project` enthält Name, Beschreibung, Erstellungszeit und die Filmliste. Jeder Film kann Titel, Jahr, Laufzeit, Regie, Genre, Speicherlink, Trailer-Link, Cover-Link, Status, Altersfreigabe, Beschreibung und Schlagwörter enthalten.

Exportdateien der früheren App-Version werden aus Kompatibilitätsgründen weiterhin erkannt und beim nächsten Export in das Videothek-Format überführt.

## Bedienlogik

- „Entdecken“ ist die Publikumsansicht für Suche, Filterung, Filmdetails und das Öffnen externer Speicherorte.
- „Archive“ ist die Bearbeitungsansicht für Projekte, Playlisten, Filme und Datenaustausch.
- Externe Links öffnen in einem neuen Browserkontext. Videothek übernimmt keine Verfügbarkeitsgarantie für das Ziel.

