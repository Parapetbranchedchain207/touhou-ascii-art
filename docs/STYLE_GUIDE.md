# ASCII art style guide

These conventions do not restrict artistic style. They help works render consistently across GitHub, terminals, and editors.

## Canvas sizes

- Small: up to 40 columns, suitable for icons and README accents.
- Standard: 41–100 columns, suitable for most characters and scenes.
- Wide: 101–160 columns, suitable for buildings, groups, and danmaku. Warn readers that horizontal scrolling may be necessary.
- A height of 80 lines or fewer is recommended. Larger works are welcome, but should include a preview.

## Character sets

- `ascii`: printable ASCII only.
- `unicode`: includes box drawing, geometric symbols, kana, kanji, or other Unicode characters.
- `mixed`: ASCII and Unicode are both important to the composition.

Label the character set accurately in metadata. Emoji widths vary significantly between platforms and should not define critical outlines.

## Whitespace and alignment

- Use spaces, never tabs.
- Start with a fixed canvas size. Pad with spaces when necessary, but avoid large unused regions.
- Full-width characters and some symbols render at different widths across terminals. If the work depends on CJK width behavior, document the tested environment in its README.
- Trailing spaces are allowed when meaningful to the composition and should otherwise be removed.

## Shading and line work

A sparse-to-dense ramp can create grayscale shading, for example:

```text
 .:-=+*#%@
```

Try to keep light direction, outline weight, and shadow density consistent within a work. Unicode box-drawing characters can suit architecture, while a pure-ASCII variant improves terminal compatibility.

## Danmaku and animation

- Fix the canvas width and height before drawing frames.
- Assign visually distinct characters to the player, player shots, enemy bullets, and background.
- Do not rely on color alone to communicate collision or danger areas.
- Document frame order, recommended frame rate, and looping behavior in the README.
- Describe the core rule of an original pattern. For inspired work, credit the spell card and source title.
