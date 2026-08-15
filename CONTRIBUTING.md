# Contributing

Thank you for helping draw Gensokyo in text. Character art, locations, narrative scenes, danmaku compositions, and small object assets are all welcome.

## Submit a new work

1. Choose the best category. When unsure, classify the work by its main visual subject.
2. Copy `templates/work/` and name the directory according to [`docs/WORK_FORMAT.md`](docs/WORK_FORMAT.md).
3. Put the primary work in `art.txt`, then complete its `README.md` and `metadata.yaml`.
4. Inspect the result in a monospaced terminal, paying close attention to wide characters, tabs, and trailing spaces.
5. Open a pull request describing the subject, category, and whether the composition is based on an existing in-game work.

For multi-frame danmaku, place equally sized frames in `frames/` and number them `001.txt`, `002.txt`, and so on. Keep a representative first frame or static version in `art.txt`.

## Requirements

- Submit only work you created, adapted with permission, or otherwise have the right to share.
- Do not repost another artist's ASCII art. Credit references in both the work README and metadata.
- Every work must include a plain-text version that remains readable without color.
- Do not submit hateful, harassing, sexually explicit, or malicious content.
- Do not submit extracted game assets, ROMs, executables, or substantial original-game text.
- Descriptions may be written in English, Japanese, or Chinese, but filenames and directory names must use lowercase ASCII kebab-case.
- Follow the [official Touhou Project fan-content guidelines](https://touhou-project.news/guideline/), which may change over time.

## Pull request checklist

- [ ] The work is in the correct category and has a descriptive directory name.
- [ ] `art.txt`, `README.md`, and `metadata.yaml` are present.
- [ ] The metadata width and height match the actual canvas.
- [ ] There are no tabs, unintended control characters, or accidental ANSI escape codes.
- [ ] All references, inspirations, and co-authors are credited.
- [ ] Preview images are supplemental; the text file remains independently readable.

## Modify an existing work

Small corrections can be submitted directly. Before substantially changing another contributor's composition or style, open an issue to discuss it, or add a clearly labeled remix variant while preserving the original credit.

## Commit messages

Use a short, specific message, for example:

```text
add reimu shrine portrait
add scarlet devil mansion location
refine moonlit danmaku frames
```
