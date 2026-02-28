# Omvandling

**Current file:** `~/Documents/Omvandling/AGENTS.md`
**Project Root Location:** `~/Documents/Omvandling`
**Rota Project File:** `~/Documents/General/00 - Rota/Projects/Omvandling/AGENTS.md`

## Project Summary

Convert ingredient measurements between volume and weight units (for example `dl`/`ml` to `g`) using ingredient density data.

## Roles to Use

Default to the Developer role for coding tasks.

- **Developer role:** `~/Documents/General/00 - Rota/Roles/Developer.md`

## Working Guidelines

- Keep changes small and reversible.
- Match existing coding conventions and file layout.
- `README.md`: setup, run commands, dependencies, and required configuration.
- `AGENTS.md`: how Codex should work in this project, cross-links to Rota, and workflow or maintenance rules.
- For all changes, run `npm run dev` and test the implemented functionality before reporting completion.

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
  "mjöl": {
    "densitet": 0.59
  }
}
```

## Expected Outputs

- Clear implementation plan when changes are non-trivial.
- Changes summarized with files touched and why.
- Tests run or suggested.
