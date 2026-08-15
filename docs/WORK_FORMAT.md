# Work format

Each work is a self-contained directory that can be understood, credited, and maintained independently. Do not combine unrelated works or multiple artists' pieces in one `art.txt`.

## Paths

Use lowercase ASCII kebab-case:

```text
art/characters/<character-slug>/<work-slug>/
art/locations/<location-slug>/<work-slug>/
art/objects/<object-slug>/<work-slug>/
art/scenes/<work-slug>/
art/danmaku/<work-slug>/
```

Examples:

```text
art/characters/reimu-hakurei/shrine-maiden-portrait/
art/locations/scarlet-devil-mansion/misty-gate/
art/scenes/hakurei-shrine-spring-feast/
art/danmaku/moon-rings/
art/objects/yin-yang-orb/mini-icon/
```

## Required files

### `art.txt`

The primary uncolored UTF-8 artwork, ready to display directly. Use LF line endings. Avoid tabs and invisible control characters. If the composition depends on trailing spaces, explain that in the work README.

### `README.md`

Link to `art.txt` so the source is one click away. A small fenced preview is optional, but avoid duplicating a large artwork in Markdown. Record:

- title and subjects;
- artist and co-artists;
- whether it is original, inspired, or adapted;
- inspiration and references;
- recommended display settings;
- special license or usage notes.

### `metadata.yaml`

Use the fields in the provided template. `description` and `tags` feed the website search, so keep them concise and descriptive. `width` is the display-column width of the longest line and `height` is the total line count. Full-width characters usually occupy two columns, so measure them in the intended terminal environment.

Recommended `source.type` values:

- `original`: an original composition;
- `inspired-by`: inspired by a character, spell card, or scene without reproducing its exact composition;
- `adaptation`: a clear adaptation of an existing composition, with source information required.

## Optional files

- `variants/*.txt`: wide, narrow, or pure-ASCII alternatives.
- `variants/*.ans`: versions containing ANSI color control sequences.
- `frames/001.txt`: sequential frames. Every frame must use the same canvas dimensions and zero-padded numbering.
- `previews/*.png` or `*.gif`: rendered previews that supplement, but never replace, the text source.

## Multi-character and cross-category works

A work centered on one character belongs in `characters`, even with a small background. A location without a clear event belongs in `locations`. Character interaction, combat, or a composition tied to a moment belongs in `scenes`. When a bullet pattern is the primary subject, use `danmaku`.
