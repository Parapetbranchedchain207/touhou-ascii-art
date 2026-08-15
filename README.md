# Touhou ASCII Art

```text
 ______          __              ___   _____  ______  _____  _____
/_  __/___  __  / /_  ____  __  /   | / ___/ / ____/ /  _/ /  _/
 / / / __ \/ / / / / / / / / / / /| | \__ \ / /      / /   / /
/ / / /_/ / /_/ / /_/ / /_/ / / ___ |___/ // /___  _/ /  _/ /
/_/  \____/\__,_/\__,_/\__,_/ /_/  |_/____/ \____/ /___/ /___/
```

An unofficial fan repository for creating and collecting Touhou Project ASCII art.

The collection is not limited to character portraits. It welcomes locations such as Hakurei Shrine and Scarlet Devil Mansion, narrative scenes, original or homage-based danmaku fragments, and small objects or symbols. Plain text that renders directly in a monospaced terminal is the primary format; ANSI-colored variants and rendered previews are optional extras.

**[Explore the searchable web gallery →](https://n0zom1z0.github.io/touhou-ascii-art/)**

## Categories

| Directory | Contents | Examples |
| --- | --- | --- |
| [`art/characters`](art/characters/) | Art centered on one character | Reimu Hakurei, Marisa Kirisame |
| [`art/locations`](art/locations/) | Places, buildings, and environments | Hakurei Shrine, Scarlet Devil Mansion |
| [`art/scenes`](art/scenes/) | Narrative compositions, events, or interactions | Feasts, duels, moon viewing |
| [`art/danmaku`](art/danmaku/) | Static patterns, frame sequences, or terminal animation assets | Spell-card-inspired patterns, original danmaku fragments |
| [`art/objects`](art/objects/) | Props, emblems, and small reusable assets | Yin-yang orb, mini-Hakkero, gohei |

Locations and scenes are intentionally separate: an environment-focused work belongs in `locations`, while a composition centered on something happening belongs in `scenes`. For a work that crosses categories, choose its clearest visual focus instead of duplicating files.

## Work structure

```text
art/<category>/<subject-or-work>/<work-slug>/
├── art.txt             # Primary plain-text artwork
├── README.md           # Display, credits, and creative notes
├── metadata.yaml       # Dimensions, character set, and source data
├── variants/           # Optional wide, narrow, pure-ASCII, or ANSI versions
├── frames/             # Optional sequential animation or danmaku frames
└── previews/           # Optional rendered PNG or GIF previews
```

Works in `scenes` and `danmaku` use the work slug directly and do not need a subject layer. See [`docs/WORK_FORMAT.md`](docs/WORK_FORMAT.md) for the full convention and [`docs/STYLE_GUIDE.md`](docs/STYLE_GUIDE.md) for layout and character guidance. Copy [`templates/work`](templates/work/) to start a new piece.

## Quick start

1. Fork this repository and create a branch.
2. Copy `templates/work/` into the appropriate category.
3. Put the artwork in `art.txt`, then complete `README.md` and `metadata.yaml`.
4. Check it in a monospaced terminal for alignment and accidental clipping.
5. Open a pull request.

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) for the full workflow and checklist. You can also open an [artwork proposal](https://github.com/N0zoM1z0/touhou-ascii-art/issues/new?template=art-request.yml) to discuss an idea first.

## Website

The gallery is a dependency-free static site generated from each work's `metadata.yaml`. Search, character filters, full-screen viewing, zoom, copy, download, and shareable artwork URLs all work in the browser.

Build and preview it locally:

```sh
ruby scripts/build_site.rb _site
python3 -m http.server --directory _site 8000
```

Then open `http://localhost:8000`. Pushes affecting artwork or website files automatically rebuild and deploy the gallery through GitHub Pages. Do not edit `_site/`; it is generated output.

## Display recommendations

- Use a monospaced font and a terminal at least 80 columns wide.
- `art.txt` uses UTF-8 and LF line endings and must not contain ANSI escape codes.
- Trailing spaces may be part of a composition; this repository's EditorConfig preserves them in `.txt` files.
- Keep a plain-text version of colored work and place ANSI variants in `variants/`.

## Copyright and fan-work notice

Touhou Project, its characters, setting, and related rights belong to Team Shanghai Alice and their respective rights holders. This is an unofficial fan project with no affiliation with or endorsement by the original creators.

See [`LICENSE.md`](LICENSE.md) for terms covering contributors' original ASCII arrangements and documentation. Contributors must only submit material they have the right to share and must follow the [official Touhou Project fan-content guidelines](https://touhou-project.news/guideline/). If this repository conflicts with the official guidelines, the official guidelines take precedence.
