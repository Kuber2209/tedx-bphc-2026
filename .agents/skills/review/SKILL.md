---
name: review_kb
description: Review recent code changes for bugs, logic errors, and Cloudflare D1 compatibility issues. Use after writing or editing code, or when asked to review changes.
argument-hint: [optional: file or area to focus on]
allowed-tools: Read, Bash, Glob, Grep
effort: high
---

You are a senior code reviewer. Review the code changes described below with two goals: catch real bugs, and flag Cloudflare D1 compatibility issues.

## Step 1 - Identify what changed

First, check the current conversation context. If there are recently written or edited files visible in this session, use those directly - do not run any shell commands.

Only if the context does not make it clear what changed, run:
```bash
git diff HEAD
```

If that returns nothing, try:
```bash
git diff HEAD~1 HEAD
```

## Step 2 - Read changed files in full

For every changed file, read the complete file using the Read tool - not just the changed lines. You need full context to spot bugs.

If $ARGUMENTS is provided, focus your review on that file or area, but still check for D1 issues everywhere.

## Step 3 - General Bug Review

Check every changed function/block for:

**Logic Errors**
- Off-by-one in loops, slice/index operations
- Inverted boolean conditions
- Missing `await` on async calls (silent undefined result)
- Promise returned but never awaited or caught
- Incorrect use of `||` vs `??` (nullish vs falsy)
- Mutating shared state that should be immutable

**Error Handling**
- try/catch blocks that swallow errors silently (empty catch or only `console.log`)
- API/DB calls with no error path
- Missing null/undefined checks before accessing `.property` or calling a method
- Type coercion issues (`==` vs `===`, string vs number comparisons)

**Data Flow**
- Variables declared but never used
- Values overwritten before being read
- Stale closures capturing old state
- Incorrect destructuring (wrong key names, missing defaults)

**Edge Cases**
- Empty array/string not handled
- Zero value treated as falsy when it shouldn't be
- Date/timezone handling
- Pagination or limit values that could be 0 or negative

## Step 4 - Cloudflare D1 Compatibility Check

D1 is SQLite under Cloudflare Workers. Check every DB-touching change for these issues:

**SQLite Syntax**
- No `RETURNING` with `UPDATE` or `DELETE` unless confirmed supported (use a separate `SELECT` after)
- No `JSONB` type - use `TEXT` and `JSON.parse`/`JSON.stringify` in application code
- No native `UUID()` function - generate UUIDs in JS (`crypto.randomUUID()`) and pass as string
- No `ARRAY` or `JSON[]` column types - serialize arrays to TEXT
- No `ENUM` type - use `TEXT` with a `CHECK` constraint
- No `FULL OUTER JOIN` in older SQLite - use `LEFT JOIN ... UNION ... RIGHT JOIN` if needed
- `AUTOINCREMENT` vs `INTEGER PRIMARY KEY` - in SQLite these behave differently; prefer `INTEGER PRIMARY KEY`

**Prisma + D1 Adapter**
- `createMany` may not be supported in the D1 Prisma adapter - flag if used; suggest individual creates in a batch
- No `connectOrCreate` with relation fields in some adapter versions - flag if used
- `Float` type maps to `REAL` in SQLite - precision behaves differently from PostgreSQL `DECIMAL`
- Migration files must be `.sql` and run via `wrangler d1 migrations apply` - check if schema changes include a migration file

**Cloudflare Workers Environment**
- No `process.env` - environment variables must come from `env` bindings (context/request `env` object)
- No Node.js-only APIs: `fs`, `path`, `crypto` (use Web Crypto API), `Buffer` (use `Uint8Array`)
- No `setTimeout`/`setInterval` for deferred work - use `waitUntil` on the execution context
- CPU time limit on free tier is 10ms (50ms on paid) - flag any loops over large arrays or heavy computation in request handlers
- `fetch` is available globally; do not import it from `node-fetch`
- Response body can only be read once - flag if `res.json()` or `res.text()` is called more than once on the same response

**D1 Query Patterns**
- Raw queries: must use `db.prepare(sql).bind(...params).run()` / `.first()` / `.all()` - flag if string interpolation is used in SQL (SQL injection risk + D1 doesn't support it)
- Batch size: `db.batch([...])` supports up to 100 statements - flag if a loop could exceed this
- `run()` vs `first()` vs `all()`: `run()` for mutations, `first()` for single row, `all()` for result sets - flag mismatches

## Step 5 - Fix and Report

If no issues found, say: "No issues found."

If issues are found, say: "Found 'X' issues, fixing them now." - then immediately apply all fixes without listing them out.

Once all fixes are applied, say: "Fixed 'X' issues and give a very short summary of the issue, file and the fix." - nothing more.

Do not produce a report, do not list issues, do not explain each fix unless the user asks. and when donn, just write in the end "DONE", nothing else
