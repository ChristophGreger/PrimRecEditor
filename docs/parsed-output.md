# Parsed Output

The editor exposes two layers:

- `ast`: the syntactic tree that mirrors the source code closely.
- `program`: the normalized representation that is only present when lexing, parsing, and validation all succeed.

Consumers should prefer `program` when they want to interpret a valid primitive-recursive program. The raw `ast` is useful for editor features, recovery, and diagnostics because it still exists when the source is invalid.

## Top-Level Shape

```ts
interface ParseResult {
  ast: ProgramAst;
  tokens: Token[];
  diagnostics: Diagnostic[];
  program?: NormalizedProgram;
}
```

`diagnostics` contains lexer, parser, and validator errors. If any error exists, `program` is omitted. Monaco markers are created directly from these diagnostics.

```ts
interface NormalizedProgram {
  kind: 'PrimitiveRecursiveProgram';
  functions: NormalizedFunction[];
  signatures: Record<string, FunctionSignature>;
}
```

`signatures` contains built-ins and user-defined functions:

```json
{
  "zero": { "name": "zero", "arity": 0, "builtin": true },
  "succ": { "name": "succ", "arity": 1, "builtin": true },
  "plus": { "name": "plus", "arity": 2, "builtin": false }
}
```

## Functions

Each valid source definition becomes one `NormalizedFunction`.

```ts
interface NormalizedFunction {
  name: string;
  arity: number;
  parameters: string[];
  expression: CoreExpression;
  dependencies: string[];
  range: SourceRange;
}
```

For this source:

```text
plusBase(x) = x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);
```

the normalized functions look like this:

```json
[
  {
    "name": "plusBase",
    "arity": 1,
    "parameters": ["x"],
    "expression": {
      "kind": "Projection",
      "parameter": "x",
      "index": 0
    },
    "dependencies": []
  },
  {
    "name": "plusStep",
    "arity": 3,
    "parameters": ["x", "y", "previous"],
    "expression": {
      "kind": "Successor",
      "argument": {
        "kind": "Projection",
        "parameter": "previous",
        "index": 2
      }
    },
    "dependencies": []
  },
  {
    "name": "plus",
    "arity": 2,
    "parameters": ["x", "y"],
    "expression": {
      "kind": "PrimitiveRecursion",
      "base": "plusBase",
      "step": "plusStep"
    },
    "dependencies": ["plusBase", "plusStep"]
  }
]
```

`range` is omitted above for readability. In the real output it is always present and contains 1-based line and column positions.

## Core Expressions

The normalized expression tree uses only primitive-recursive building blocks.

### Projection

Variables become projections into the current function's parameter list.

```text
first(x, y) = x;
```

```json
{
  "kind": "Projection",
  "parameter": "x",
  "index": 0
}
```

The `index` is zero-based. For `first(x, y)`, `x` has index `0` and `y` has index `1`.

### Zero

`zero()` becomes:

```json
{ "kind": "Zero" }
```

The validator guarantees that `zero()` has exactly zero arguments.

### Successor

`succ(expr)` becomes:

```json
{
  "kind": "Successor",
  "argument": { "...": "normalized expression" }
}
```

The validator guarantees that `succ` has exactly one argument.

### Composition

Ordinary function calls become composition nodes.

```text
square(x) = mul(x, x);
```

```json
{
  "kind": "Composition",
  "callee": "mul",
  "args": [
    { "kind": "Projection", "parameter": "x", "index": 0 },
    { "kind": "Projection", "parameter": "x", "index": 0 }
  ]
}
```

The validator guarantees that `callee` is already defined and that the number of arguments matches the callee arity.

### Primitive Recursion

`primrec(base, step)` becomes:

```json
{
  "kind": "PrimitiveRecursion",
  "base": "plusBase",
  "step": "plusStep"
}
```

For a definition `f(x1, ..., xm) = primrec(base, step);`, the validator guarantees:

- `m >= 1`
- `base` is already defined
- `step` is already defined
- `arity(base) = m - 1`
- `arity(step) = m + 1`

The recursion is always over the last parameter of `f`.

### Numeric Literals

Natural number literals are enabled as syntactic sugar. They are expanded into the primitive core:

```text
two(x) = 2;
```

```json
{
  "kind": "Successor",
  "argument": {
    "kind": "Successor",
    "argument": {
      "kind": "Zero"
    }
  }
}
```

## Diagnostics And Safety Guarantees

When `program` is present, these rules have already been checked:

- comments and whitespace were ignored correctly
- every definition follows `f(x1, ..., xn) = expression;`
- reserved names `zero`, `succ`, and `primrec` were not redefined
- parameters are unique and in scope
- calls target previously defined functions
- function-call arities are correct
- `zero()` and `succ(...)` use their fixed arities
- `primrec(base, step)` only appears as a complete function body
- `primrec` base and step arities match the current function arity
- general direct or indirect recursion is rejected

That means an interpreter can evaluate `program.functions` in order and use `dependencies` to locate referenced helpers without needing to repeat the language-level checks.
