# Primitive Recursive Function Language

This document defines a compact language for writing primitive recursive functions.

It assumes that the reader already knows primitive recursive functions, including:

- zero
- successor
- composition
- primitive recursion

The language is intentionally close to the standard mathematical presentation of primitive recursive functions, while using readable names and ordinary function-call syntax.

---

# 1. Programs

A program is a list of function definitions.

Each definition has the form:

```text id="1xg1rl"
f(x1, ..., xn) = expression;
```

The parameter list determines the arity of `f`.

Examples:

```text id="0vavti"
id(x) = x;

plus(x, y) = primrec(plusBase, plusStep);
```

Every function maps natural numbers to natural numbers.

---

# 2. Comments

Single-line comments begin with `#`.

Everything after `#` until the end of the line is ignored.

Example:

```text id="y2cnl5"
# This is a comment

plusBase(x) = x; # return x
```

Multi-line comments use the form:

```text id="mhcq4t"
/*
  comment
*/
```

Example:

```text id="m7m0ta"
/*
  Addition by primitive recursion
*/

plus(x, y) = primrec(plusBase, plusStep);
```

Comments may appear wherever whitespace is allowed.

Comments have no semantic meaning and are ignored by the parser.

---

# 3. Function Names

Function names must satisfy the following rules:

- they may contain:
  - letters `a-z`, `A-Z`
  - digits `0-9`
  - underscores `_`
- they must begin with:
  - a letter, or
  - an underscore `_`

Examples of valid function names:

```text id="aywmzn"
f
plus
plusBase
mul2
_square
```

Examples of invalid function names:

```text id="e6d50h"
2plus
my-function
plus!
```

Function names are case-sensitive.

Therefore:

```text id="3v3m8h"
plus
Plus
PLUS
```

are different function names.

The following names are reserved and may not be redefined:

```text id="0l55ud"
zero
succ
primrec
```

---

# 4. Expressions

Expressions are built from:

- `zero()`
- `succ(...)`
- variables
- calls to previously defined functions
- `primrec(base, step)`
- natural number literals, if enabled as syntactic sugar

Examples:

```text id="kh0it7"
x
succ(x)
plus(x, y)
mul(succ(x), y)
```

---

# 5. Variables

Variables are ordinary expressions.

Examples:

```text id="c97pbj"
id(x) = x;

first(x, y) = x;
```

Variables are scoped to the function definition in which they appear.

Variable names follow the same naming rules as function names.

Examples of valid variable names:

```text id="n60g0s"
x
y
tmp
value2
_result
```

Examples of invalid variable names:

```text id="uv9ppz"
2x
my-variable
x!
```

---

# 6. Zero

`zero` is the fixed nullary primitive function

\[
zero : \mathbb{N}^0 \to \mathbb{N}
\]

with value:

```text id="d7x8qg"
zero() = 0
```

Therefore `zero` never takes arguments.

Examples:

```text id="l9x0qn"
zero()
succ(zero())
```

Invalid:

```text id="o2lyvl"
zero(x)
zero(a, b)
```

A function may ignore its parameters and still return `zero()`.

Example:

```text id="7b7n50"
zeroUnary(x) = zero();

zeroBinary(x, y) = zero();
```

---

# 7. Successor

`succ` is unary.

```text id="wlhz9z"
succ(expression)
```

Example:

```text id="5rwjlwm"
one(x) = succ(zero());
```

This defines the unary constant function returning `1`.

---

# 8. Composition

Composition is written as ordinary function application.

For example:

```text id="0s7qj6"
f(g(x))
```

means the composition of `f` and `g`.

For multi-argument functions:

```text id="jlwm82"
h(g1(...), g2(...), ..., gk(...))
```

is the usual composition of `h` with `g1, ..., gk`.

Example:

```text id="jlwm83"
square(x) = mul(x, x);
```

Another example:

```text id="jlwm84"
double(x) = plus(x, x);
```

---

# 9. Primitive Recursion

Primitive recursion is written as:

```text id="jlwm85"
primrec(base, step)
```

Here `base` and `step` are names of previously defined functions.

Example:

```text id="jlwm86"
plus(x, y) = primrec(plusBase, plusStep);
```

The base and step functions are separate named definitions.

---

# 10. Arity Rule for `primrec`

If

```text id="jlwm87"
f(x1, ..., xm) = primrec(base, step);
```

then primitive recursion is over the last argument of `f`.

The arities must satisfy:

```text id="jlwm88"
arity(base) = m - 1
arity(step) = m + 1
```

Equivalently, if `base` has arity `n`, then:

```text id="jlwm89"
base : n arguments
step : n + 2 arguments
f    : n + 1 arguments
```

The meaning is:

```text id="jlwm8a"
f(x1, ..., xn, 0) = base(x1, ..., xn)

f(x1, ..., xn, succ(y))
  = step(x1, ..., xn, y, f(x1, ..., xn, y))
```

The step function always receives its arguments in this order:

```text id="jlwm8b"
x1, ..., xn, y, previous
```

where

```text id="jlwm8c"
previous = f(x1, ..., xn, y)
```

---

# 11. Example: Addition

```text id="jlwm8d"
plusBase(x) = x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);
```

This corresponds to:

```text id="jlwm8e"
plus(x, 0) = x

plus(x, succ(y)) = succ(plus(x, y))
```

---

# 12. Example: Multiplication

```text id="jlwm8f"
mulBase(x) =
  zero();

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);
```

This corresponds to:

```text id="jlwm8g"
mul(x, 0) = 0

mul(x, succ(y)) = plus(mul(x, y), x)
```

---

# 13. Example: Predecessor

```text id="jlwm8h"
predBase() = zero();

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);
```

This corresponds to:

```text id="jlwm8i"
pred(0) = 0

pred(succ(y)) = y
```

---

# 14. Optional Numeric Literals

Natural number literals may be allowed as syntactic sugar.

For example:

```text id="jlwm8j"
0
1
2
```

can be expanded into `zero` and repeated `succ`.

Example:

```text id="jlwm8k"
one(x) = 1;
```

is shorthand for:

```text id="jlwm8l"
one(x) = succ(zero());
```

Numeric literals are optional and not part of the primitive core.

---

# 15. Validity Rules

The editor should enforce the following rules.

## Parameters

The parameter list of a function determines its arity.

```text id="jlwm8m"
f(x, y, z)
```

is ternary.

## Variables

Variables may appear as expressions.

A variable is valid only if it is part of the current function parameter list.

Example:

```text id="jlwm8n"
f(x, y) = plus(x, y);
```

Invalid:

```text id="jlwm8o"
f(x) = y;
```

because `y` is not in scope.

## Function Calls

Every function call must use exactly the correct number of arguments.

Example:

```text id="jlwm8p"
plus(x, y)
```

is valid if `plus` is binary.

Invalid:

```text id="jlwm8q"
plus(x)
plus(x, y, z)
```

## Successor

`succ` must have exactly one argument.

Valid:

```text id="jlwm8r"
succ(x)
```

Invalid:

```text id="jlwm8s"
succ()
succ(x, y)
```

## Zero

`zero` must always be called with exactly zero arguments.

Valid:

```text id="jlwm8t"
zero()
```

Invalid:

```text id="jlwm8u"
zero(x)
zero(a, b)
```

## Primitive Recursion

For

```text id="jlwm8v"
f(x1, ..., xm) = primrec(base, step);
```

we require:

```text id="jlwm8w"
arity(base) = m - 1
arity(step) = m + 1
```

Also, `base` and `step` must be previously defined function names.

## No General Recursion

A function may not call itself directly or indirectly.

Invalid:

```text id="jlwm8x"
f(x) = f(x);
```

Also invalid:

```text id="jlwm8y"
f(x) = g(x);

g(x) = f(x);
```

Recursion is only allowed through `primrec(base, step)`.

The helper functions `base` and `step` must not depend on the function being defined.

---

# 16. Complete Example

```text id="jlwm8z"
# Addition

plusBase(x) = x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

/*
  Multiplication
*/

mulBase(x) =
  zero();

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

predBase() = zero();

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

square(x) =
  mul(x, x);
```

---

# 17. Summary

The language uses:

```text id="jlwm90"
zero()
succ(...)
variables
f(...)
primrec(base, step)
```

Functions are written using ordinary mathematical variable notation.

Composition is written through ordinary function application.

Primitive recursion is expressed using:

```text id="jlwm91"
primrec(base, step)
```

where recursion is always over the last argument of the function being defined.