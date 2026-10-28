---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
---

Interview the user relentlessly until you reach a shared understanding. Map this as a **design tree**: every decision branches into the decisions that hang off it.

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask _now_ without guessing at answers you haven't heard yet. Ask the whole frontier in one round: number each question and give your recommended answer. Then wait for the user's answers before the next round.

Format a round like so:

```
❓ **Q1** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>

---

❓ **Q2** - **<question title>**: <question body, might be multiple paragraphs, including multiple choices>

➡️ <your recommended answer>
```

Word each question so "yes" accepts your recommended answer.

**Deliver every round through Lavish, never as chat text.** Invoke the `lavish` skill and follow the current guidance from `npx -y lavish-axi --help`. Render each round as an HTML artifact: one card per question with its title, body, options and your recommended answer (the same content as the format above). Always style it with the Memorable (memorable.sh) theme from the `lavish` skill's "Standing design direction" section (inline `memorable-theme.css`; one `.card` per question, `.label` for "Q1", `.rec` for the recommended answer), never the default Lavish/DaisyUI look. Open it with `npx -y lavish-axi <html-file>` and wait for the user's annotations/feedback in the review loop; treat that feedback as their answers. Reuse one artifact across rounds (or link rounds together) so settled decisions stay visible. In chat, only say that a round is open in Lavish. If Lavish fails to launch, tell the user and fall back to the chat format above.

Each round the user answers reshapes the tree: settled decisions push the frontier outward and unblock questions that depended on them. Recompute the frontier and ask the next round. A question whose answer depends on another question still open in this round belongs to a _later_ round, not this one.

Finding _facts_ is your job, never the user's. When a frontier question needs a fact from the environment (filesystem, tools, etc.), dispatch a sub-agent to find it; don't ask the user for anything you could look up yourself. Don't block on it: a running exploration is an unsettled prerequisite, so only the questions downstream of it wait for the sub-agent to report; ask the rest of the frontier now. The _decisions_ are the user's: put each to them and wait.

The session is done when the frontier is empty: every branch of the design tree visited, nothing left silently assumed. Do not act on it until the user confirms you have reached a shared understanding.
