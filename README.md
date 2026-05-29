# PrimRec Editor

React + Vite + TypeScript editor for the primitive-recursive function language described in `docs/Format_Specification.md`.

The implementation follows a small language pipeline:

- `src/primrecLanguage/lexer.ts` scans source text and strips comments.
- `src/primrecLanguage/parser.ts` builds a recoverable AST.
- `src/primrecLanguage/validation.ts` checks arities, scope, ordering, reserved names, `primrec` rules, and recursion constraints, then emits a normalized program.
- `src/editor/primRecMonaco.ts` adapts the language layer to Monaco markers, hover, syntax coloring, and autocompletion.

The normalized output format is documented in detail in `docs/parsed-output.md`.

## Scripts

```bash
npm run dev
npm run build
npm test
npm run lint
npm run smt2 -- "id(x) = x; post id(x) -> r { r == x; }"
```

In the browser console, the same conversion is exposed as:

```js
primrecToSmt2('id(x) = x; post id(x) -> r { r == x; }')
```

To print the generated SMT-LIB with visible line breaks and indentation in the
browser console:

```js
printToSmt2('id(x) = x; post id(x) -> r { r == x; }')
```
