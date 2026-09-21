---
name: git-commit
description: Generate a commit message from the current staged/unstaged changes, ready to paste directly into a terminal git commit command without breaking on shell quoting.
argument-hint: [optional: specific context or split instruction]
---

# Skill: Git Commit Message Composer

## Purpose
Generate a commit message from the current staged/unstaged changes, ready to paste directly
into a terminal `git commit -m "..."` command without breaking on shell quoting. Do not ask
the user to describe their changes - read the diff yourself and work it out.

## Step 1 - Gather the diff
- Run `git status` to see what's staged, unstaged, and untracked.
- Run all the `git diff` for unstaged changes and `git diff --cached` for staged changes. DOnt be lazy If both
  have content, cover both, but make it clear in your own head which will actually go into
  the commit (staged, if anything is staged; otherwise treat everything as in-scope).
- If the diff is large or spans clearly unrelated concerns (e.g. a feature change mixed with
  an unrelated formatting pass), say so in one line before the message and suggest splitting
  into separate commits - but still produce one message for what's currently staged/changed.

## Step 2 - Determine the change
- Identify the actual intent behind the diff, not just a file-by-file listing: what
  behavior changed, what was added/removed/fixed, and why it matters (bug fix, new feature,
  refactor, config change, docs, etc.).
- Note the primary file(s) or module(s) affected if it helps clarity, but don't pad the
  message with every touched filename - summarize the change, not the diff.
- Always prefix the subject line using Conventional Commits. Pick the type that best
  matches the change:
  - `feat:` - a new feature or capability for the user/system
  - `fix:` - a bug fix
  - `refactor:` - code change that neither fixes a bug nor adds a feature (restructuring,
    renaming, simplifying)
  - `chore:` - routine maintenance, tooling, dependency bumps, config, build scripts
  - `docs:` - documentation only
  - `style:` - formatting/whitespace only, no logic change
  - `test:` - adding or fixing tests only
  - `perf:` - a change that specifically improves performance
  - `ci:` - CI/CD pipeline or workflow changes
  - `revert:` - reverting a previous commit
  - If the change touches a specific, well-defined module/scope, use the optional scope
    form: `type(scope): summary` (e.g. `fix(auth): ...`). Only add a scope when it's
    genuinely clarifying - don't force one.
  - If the diff mixes multiple types (e.g. a feature plus unrelated chore work), pick the
    type that reflects the dominant/primary change and mention the split suggestion from
    Step 1.
  - Check recent `git log` only to match this repo's existing scope-naming style if it has
    one (e.g. does it use `fix(api):` or `fix/api:`) - the type prefixes above are used
    regardless of what the repo has done historically.

## Step 3 - Write the message
- Subject line: imperative mood, under ~72 characters, no trailing period.
- Optional body (only if the change isn't self-explanatory from the subject): a few
  bullet points on what and why, wrapped at ~72 chars.
- HARD CONSTRAINT: the message must not contain any `'` or `"` characters anywhere,
  including inside words (use "does not" instead of "doesn't", rewrite instead of
  contracting, avoid quoting identifiers - write `the status field` not `the "status"
  field`). This is so it can be pasted straight into `git commit -m "..."` without escaping.
- Output the final message in a single fenced code block, exactly as it should be pasted,
  with nothing else inside the block (no explanation, no backticks-within-backticks).

## Output format
One short line stating what the diff does (for the user's own context), then the commit
message in a fenced code block. Nothing else - no restating the diff, no "let me know if
you'd like changes" filler.
