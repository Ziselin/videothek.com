# Videothek – wiederverwendbare Designvorlagen

Dieser Ordner beschreibt die beiden visuellen Systeme der Videothek unabhängig von der konkreten Implementierung. Beide Vorlagen erhalten dieselbe Informationsarchitektur und dieselben Funktionen; sie unterscheiden sich ausschließlich in Tonalität, Oberflächen und Bewegung.

- [`standard-cinematheque.md`](standard-cinematheque.md): ruhige, helle Privat-Cinémathèque.
- [`neon-video-store.md`](neon-video-store.md): amerikanische Videothek nach Sonnenuntergang.

## Gemeinsame Regeln

- Inhalte und Bedienlogik dürfen beim Themewechsel nicht springen oder verschwinden.
- Text, Status und Fokus müssen ohne Farbe allein verständlich bleiben.
- Interaktive Ziele sind mindestens 44 × 44 px groß.
- Cover bleiben der visuelle Anker; Dekoration darf sie nicht überstrahlen.
- Animationen dauern 160–220 ms und respektieren `prefers-reduced-motion`.
- Themes werden über ein Attribut am Dokument gekapselt. Ein alternatives Theme überschreibt keine unselektierten Basisklassen.
