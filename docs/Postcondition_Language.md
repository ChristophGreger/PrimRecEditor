# PrimRec Postcondition Language

This document defines a compact postcondition language for primitive-recursive
functions. The language is designed as a readable surface syntax for SMT-LIB
`Core` and `Ints` formulas, with a raw SMT escape hatch for other SMT-LIB
theories, Eldarica-specific features, or future SMT-LIB features.

Every value of a primitive-recursive function is a natural number, including
`0`. Therefore all function inputs and result variables in a postcondition are
implicitly `Nat`.

---

## 1. Postcondition Blocks

A postcondition has the form:

```text
post functionName(x1, ..., xn) -> result {
  formula;
  formula;
}
```

The function name must refer to an already defined primitive-recursive function.
The parameter count must match the function arity. The parameter names in the
postcondition introduce local names for that specification.

Multiple formulas in one block are conjoined:

```text
post f(x) -> r {
  r >= x;
  r != 0;
}
```

means:

```text
r >= x && r != 0
```

There is no separate `requires` clause. Preconditions and case distinctions are
written directly with implication:

```text
post divide(x, y) -> r {
  y != 0 => r == x div y;
  y == 0 => r == 0;
}
```

---

## 2. Nat Semantics

All visible PrimRec variables are natural numbers:

```text
x1, ..., xn, result in Nat
```

For Eldarica, these values can be encoded as SMT-LIB `Int` values with automatic
non-negativity constraints:

```smt
(>= x1 0)
...
(>= result 0)
```

Arithmetic subexpressions may still become negative. For example, `x - y` is
ordinary SMT-LIB integer subtraction, not truncated subtraction. If truncated
subtraction is needed, it should be a normal PrimRec function such as
`sub(x, y)`.

---

## 3. Boolean Formulas

The following SMT-LIB `Core` constructs are available:

```text
true
false

!p
p && q
p || q
p xor q
p => q
p <=> q

a == b
a != b
distinct(a, b, c)
ite(condition, thenExpr, elseExpr)
```

Suggested SMT-LIB translation:

```text
!        -> not
&&       -> and
||       -> or
xor      -> xor
=>       -> =>
<=>      -> =
==       -> =
!=       -> not =
distinct -> distinct
ite      -> ite
```

`ite` may return either a formula or a term, matching SMT-LIB's polymorphic
`ite`.

---

## 4. Integer/Nat Terms

The language supports natural-number literals and arithmetic term syntax:

```text
0
1
42

-x
x + y
x - y
x * y
x div y
x mod y
abs(x)
x ** y
```

All operators in this list except `**` lower directly to SMT-LIB `Ints`
operators. Exponentiation is lowered separately as described below.

Comparisons:

```text
x < y
x <= y
x > y
x >= y
```

Divisibility uses readable syntax:

```text
divisible(n, x)
```

where `n` must be a positive numeral. It translates to SMT-LIB:

```smt
((_ divisible n) x)
```

Exponentiation uses readable syntax:

```text
x ** y
```

SMT-LIB `Int` does not define a built-in exponentiation operator. The compiler
therefore lowers `**` to an auxiliary Horn relation:

```smt
(__primrec_pow x y powResult)
```

and uses `powResult` in the surrounding term. This avoids non-standard symbols
such as `^`, which Eldarica does not parse as integer exponentiation.

Example:

```text
post even(x) -> r {
  r == 1 <=> divisible(2, x);
}
```

---

## 5. Quantifiers

Quantified variables are `Nat` by default:

```text
forall z. z <= x => f(z) <= r

exists k. r == 2 * k
```

Multiple variables may be introduced together:

```text
forall a, b. a <= b => f(a) <= f(b)
```

The compiler translates quantified variables to SMT-LIB `Int` variables with
non-negativity guards.

---

## 6. Local Bindings

Local names can be introduced with `let`:

```text
let q = x div y;
let rem = x mod y;
x == y * q + rem;
```

Expression-level `let` is also allowed:

```text
let q = x div y in q <= x
```

---

## 7. PrimRec Function Calls

Already defined primitive-recursive functions may be used in postconditions:

```text
post square(x) -> r {
  r == mul(x, x);
}
```

The compiler resolves `mul` against the existing PrimRec definitions. Built-in
operators such as `*`, `div`, and `mod` are SMT-LIB arithmetic. Calls such as
`mul(x, y)` are PrimRec function calls.

For Horn clauses, PrimRec functions should be encoded relationally. A function
`mul(x, y) -> r` becomes a relation:

```smt
(declare-fun _mul (Int Int Int) Bool)
```

A term-style call:

```text
r == mul(x, x)
```

can be lowered by introducing a fresh value:

```smt
(exists ((t Int))
  (and (_mul x x t)
       (= r t)))
```

When possible, the compiler should place such relation atoms in Horn clause
bodies.

---

## 8. Raw SMT Escape Hatch

For constructs not covered by the surface language, raw SMT-LIB can be embedded:

```text
post f(x) -> r {
  r >= x;

  smt {
    ((_ divisible 2) r)
  }
}
```

Global SMT-LIB declarations or options can be provided with a top-level SMT
block:

```text
smt {
  (declare-fun magic (Int Int) Bool)
}
```

and then used inside postconditions:

```text
post f(x) -> r {
  smt {
    (magic x r)
  }
}
```

The raw SMT escape hatch is intentionally unrestricted by this surface syntax;
it is checked by the downstream SMT-LIB/Eldarica parser.

---

## 9. Examples

Addition:

```text
post plus(x, y) -> r {
  r == x + y;
}
```

Multiplication:

```text
post mul(x, y) -> r {
  r == x * y;
}
```

Predecessor:

```text
post pred(x) -> r {
  x == 0 => r == 0;
  x > 0 => r == x - 1;
}
```

Division by two:

```text
post div2(x) -> r {
  r == x div 2;
  x mod 2 == 0 => x == 2 * r;
  x mod 2 == 1 => x == 2 * r + 1;
}
```

Maximum:

```text
post max(x, y) -> r {
  r >= x;
  r >= y;
  r == x || r == y;
}
```

Greatest common divisor:

```text
post gcd(x, y) -> r {
  r > 0 => x mod r == 0;
  r > 0 => y mod r == 0;

  forall d.
    d > 0 && x mod d == 0 && y mod d == 0 => d <= r;
}
```

Fibonacci, written recursively as a specification:

```text
post fib(n) -> r {
  n == 0 => r == 0;
  n == 1 => r == 1;
  n >= 2 => r == fib(n - 1) + fib(n - 2);
}
```

An equivalent Nat-only offset form avoids negative-looking call arguments:

```text
post fib(n) -> r {
  n == 0 => r == 0;
  n == 1 => r == 1;

  forall k.
    n == k + 2 => r == fib(k + 1) + fib(k);
}
```

The self-call in this postcondition is a recursive specification of the graph of
`fib`; it does not add general recursion to the PrimRec programming language.
For Horn clauses, the recursive calls are translated to relation atoms for
`fib` in the verification condition.

---

## 10. Compact Grammar Sketch

```text
program        ::= (postBlock | smtBlock)*

postBlock      ::= "post" identifier "(" params? ")" "->" identifier block
params         ::= identifier ("," identifier)*
block          ::= "{" statement* "}"
statement      ::= formula ";"
                |  "let" identifier "=" term ";"
                |  smtBlock

formula        ::= "true" | "false"
                |  term relation term
                |  "distinct" "(" terms ")"
                |  "!" formula
                |  formula ("&&" | "||" | "xor" | "=>" | "<=>") formula
                |  "ite" "(" formula "," formula "," formula ")"
                |  quantifier identifiers "." formula
                |  "(" formula ")"
                |  "smt" rawSmtBlock

quantifier     ::= "forall" | "exists"
relation       ::= "==" | "!=" | "<" | "<=" | ">" | ">="

term           ::= number
                |  identifier
                |  "-" term
                |  term ("+" | "-" | "*" | "div" | "mod" | "**") term
                |  "abs" "(" term ")"
                |  "ite" "(" formula "," term "," term ")"
                |  "divisible" "(" number "," term ")"
                |  identifier "(" terms? ")"
                |  "let" identifier "=" term "in" term
                |  "(" term ")"

terms          ::= term ("," term)*
smtBlock       ::= "smt" rawSmtBlock
rawSmtBlock    ::= "{" raw SMT-LIB text "}"
```
