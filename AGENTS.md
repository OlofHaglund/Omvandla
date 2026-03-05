# Omvandling

## Project Summary

Convert ingredient measurements between volume and weight units (for example `dl`/`ml` to `g`) using ingredient density data.

## Default Role

Use the Developer role for coding tasks.

## Working Guidelines

- Keep changes small and reversible.
- Match existing coding conventions and file layout.
- Keep `README.md` and this file accurate after changes.
- For all changes, run `npm run dev` and validate implemented behavior before completion.

## Data Format

`ingredienser.json` structure:

- Ingredient name is the key.
- `densitet` is a subkey with value in `kg/dm3`.

Example:

```json
{
  "socker": {
    "densitet": 1.59
  },
  "mjol": {
    "densitet": 0.59
  }
}
```
