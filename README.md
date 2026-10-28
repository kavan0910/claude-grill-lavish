# claude-grill-lavish

My `grill-me` + `grilling` + `lavish` skill setup for Claude Code, including the
light **Memorable** (memorable.sh) Lavish theme, so any machine gets the same behaviour.

## What's in here

| Skill | What it does |
|---|---|
| `grill-me` | Slash-command entry point (`/grill-me`). Just calls `grilling`. |
| `grilling` | Interviews you in rounds over a decision tree, each question with a recommended answer. Each round is delivered as a Lavish page. |
| `lavish` | Renders plans/comparisons/reports as annotatable HTML via `lavish-axi`, always in the Memorable light theme. |

The Lavish template lives in `skills/lavish/`:

- `memorable-theme.css`: v2 light theme (warm off-white, Geist / Geist Mono / Instrument Serif, amber + emerald accents)
- `memorable-fun.js`: optional playful layer (scroll progress, card spotlight, reveals, confetti, copy buttons)

`SKILL.md` tells the agent to inline both files into each artifact so every page is a single portable HTML file.

## Install

Requires Node (Lavish runs through `npx -y lavish-axi`; no global install needed).

```bash
git clone https://github.com/kavan0910/claude-grill-lavish.git
cd claude-grill-lavish
./install.sh                    # global: ~/.claude/skills
./install.sh --project ~/my-app # or per-project: ~/my-app/.claude/skills
./install.sh --agents           # also copy to .agents/skills (Codex-style agents)
```

Restart Claude Code, then use `/grill-me` or `/lavish`.

## Optional: save location

On my machine Lavish pages are saved to `~/Downloads/Code/.lavish/` rather than the working directory.
That was a personal preference stored in Claude's memory, not part of the skills. To get the same,
tell Claude: "save Lavish artifacts to ~/Downloads/Code/.lavish/ by default".

## Updating

Edit the files in `skills/`, commit, and re-run `./install.sh` on each machine after `git pull`.
