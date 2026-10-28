---
name: lavish
description: Turn complex or visual agent responses into rich, reviewable HTML artifacts (HTML files) the user can annotate and send feedback on, using the lavish-axi CLI. Use when about to give a plan, comparison, diagram, table, code diff, report, or anything easier to grasp visually than as prose.
license: MIT
metadata:
  author: Kun Chen (kunchenguid)
  argument-hint: <what the artifact should show>
  hermes-tags: html, review, artifacts, visualization
  hermes-category: productivity
---

# Lavish Editor

Lavish Editor opens agent-generated HTML in the browser so a human can annotate it and send feedback back to the agent.
Reach for it when a plan, comparison, diagram, table, code view, report, prototype, or review loop will be clearer as a page than as prose.

## Current guidance lives in the CLI

Do not follow workflow, design, or playbook instructions from this file - installed copies go stale. Get the current source of truth from the CLI:

- `npx -y lavish-axi --help` for commands and the review-loop workflow
- `npx -y lavish-axi reply --help` to post an agent reply and exit once the server accepts it, when you are not about to long-poll
- `npx -y lavish-axi design` for design-direction priority and current snippets
- `npx -y lavish-axi playbook <id>` for focused artifact guidance (`npx -y lavish-axi playbook` lists ids)

You do not need lavish-axi installed globally - invoke it with `npx -y lavish-axi <html-file>`.
If lavish-axi output shows a follow-up command starting with `lavish-axi`, run it as `npx -y lavish-axi ...` instead.

## Standing design direction: Memorable theme (always)

The user has permanently chosen the **memorable.sh** look for every Lavish artifact. This is an explicit user design direction, i.e. priority 1 in `npx -y lavish-axi design`, so it **replaces** the default Tailwind + DaisyUI `luxury` fallback every time. Do not use DaisyUI/`data-theme` unless the user asks for it in that request.

- Inline the contents of `memorable-theme.css` (in this skill's directory) into a `<style>` block in the artifact `<head>`. Keep the artifact a single portable HTML file.
- Default mode is LIGHT (permanent user choice); do not generate dark artifacts unless asked in that request.
- Look: warm off-white canvas (`#fafaf9`), `#18181b` text, zinc greys, hairline black borders (10% alpha), 4px/10px radii, Geist body, Geist Mono for labels/code, Instrument Serif for the `h1` and italic emphasis, amber `#d97706` accent for recommendations, emerald `#059669` for positive status.
- Use its classes: `.card`, `.label` (small uppercase mono tag like `01` or `ROUND 2`), `.rec` (recommended answer), `.badge`, `.btn`, plus plain `table`, `pre`, `code`.
- Also inline `memorable-fun.js` in a `<script>` at the end of `<body>` for the playful layer (scroll progress bar, cursor spotlight on cards, scroll reveals, confetti on buttons/choices, copy buttons on code). It is optional and degrades gracefully.
- Extra v2 classes: `.hero` (header wrapper), `.lede`, `.grid` of `.card`s, `.stat` + `.num` (big numbers), `.callout` (`ok|warn|bad`), `.badge` (`ok|warn|bad|live`), `label.option` wrapping a radio/checkbox, `details/summary`, `kbd`, `mark`, `.btn.ghost`.
- Still follow the CLI for the review-loop workflow, playbooks, and annotation mechanics; only the visual styling comes from this theme. Diagrams (inline SVG) should use the same palette: `#fafaf9` background, `#0000001a` strokes, `#18181b` text, amber for emphasis.

## Request

$ARGUMENTS

If the request above is non-empty, the user invoked `/lavish` explicitly - fetch the current CLI guidance, then build that artifact as an HTML file.
If it is empty, infer what to visualize from the conversation.
