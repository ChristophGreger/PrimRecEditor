# Primitive Recursive Function Examples

This file contains many examples for the primitive-recursive function language
defined in `Format_Specification.md`.

All examples are written over natural numbers. Boolean-valued functions return
`1` for true and `0` for false.

The snippets are cumulative: each code block may use functions defined in
earlier code blocks. If you paste them into the editor, paste them in order.

---

## 1. Basic Projections and Constants

Mathematical description:

\[
id(x) = x
\]

\[
projFirst(x,y) = x
\]

\[
projSecond(x,y) = y
\]

```text
# Identity and projections

id(x) = x;

projFirst(x, y) = x;

projSecond(x, y) = y;

# Constant functions with numeric literals

constZero() = 0;

constTen() = 10;
```

---

## 2. Addition, Increment, and Small Multiples

Mathematical description:

\[
plus(x,0) = x
\]

\[
plus(x,y+1) = plus(x,y) + 1
\]

So `plus(x,y)` computes \(x+y\).

```text
# Addition by primitive recursion over the second argument

plusBase(x) = x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

# Derived examples using composition

inc(x) = succ(x);

addTwo(x) =
  plus(x, 2);

double(x) =
  plus(x, x);

triple(x) =
  plus(double(x), x);
```

---

## 3. Predecessor and Truncated Subtraction

Mathematical description:

\[
pred(0) = 0
\]

\[
pred(y+1) = y
\]

Truncated subtraction is:

\[
sub(x,0) = x
\]

\[
sub(x,y+1) = pred(sub(x,y))
\]

So `sub(x,y)` computes \(\max(x-y,0)\).

```text
# Predecessor

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

# Truncated subtraction

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

# Absolute difference: |x - y|

absDiff(x, y) =
  plus(sub(x, y), sub(y, x));
```

---

## 4. Multiplication, Square, and Cube

Mathematical description:

\[
mul(x,0) = 0
\]

\[
mul(x,y+1) = mul(x,y) + x
\]

So `mul(x,y)` computes \(x \cdot y\).

```text
# Multiplication by repeated addition

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

# Derived examples

square(x) =
  mul(x, x);

cube(x) =
  mul(square(x), x);

quadruple(x) =
  double(double(x));
```

---

## 5. Exponentiation

Mathematical description:

\[
exp(x,0) = 1
\]

\[
exp(x,y+1) = exp(x,y) \cdot x
\]

So `exp(x,y)` computes \(x^y\). In this definition, `exp(0,0)` is `1`.

```text
# Exponentiation by repeated multiplication

expBase(x) =
  1;

expStep(x, y, previous) =
  mul(previous, x);

exp(x, y) = primrec(expBase, expStep);

# Derived examples

pow2(n) =
  exp(2, n);

pow3(n) =
  exp(3, n);

fourthPower(x) =
  exp(x, 4);
```

---

## 6. Factorial

Mathematical description:

\[
fact(0) = 1
\]

\[
fact(y+1) = (y+1) \cdot fact(y)
\]

So `fact(n)` computes \(n!\).

```text
# Factorial

factBase() =
  1;

factStep(y, previous) =
  mul(succ(y), previous);

fact(n) = primrec(factBase, factStep);
```

---

## 7. Triangular Numbers and Sum of Squares

Mathematical description:

\[
tri(0) = 0
\]

\[
tri(y+1) = tri(y) + (y+1)
\]

So `tri(n)` computes:

\[
0 + 1 + 2 + \dots + n
\]

The function `sumSquares(n)` computes:

\[
1^2 + 2^2 + \dots + n^2
\]

```text
# Triangular numbers

triBase() =
  0;

triStep(y, previous) =
  plus(previous, succ(y));

tri(n) = primrec(triBase, triStep);

# Sum of squares up to n

sumSquaresBase() =
  0;

sumSquaresStep(y, previous) =
  plus(previous, square(succ(y)));

sumSquares(n) = primrec(sumSquaresBase, sumSquaresStep);
```

---

## 8. Zero Test, Sign, and Boolean Operations

Mathematical description:

\[
isZero(0) = 1
\]

\[
isZero(x+1) = 0
\]

The function `isNonZero(x)` returns `1` exactly when \(x > 0\).

```text
# Zero test

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

# Sign-style non-zero test

isNonZero(x) =
  isZero(isZero(x));

# Boolean operations for values encoded as 0 or 1

boolNot(b) =
  isZero(b);

boolAnd(a, b) =
  mul(a, b);

boolOr(a, b) =
  isNonZero(plus(a, b));
```

---

## 9. Comparisons: leq, geq, greq, lt, gt, eq, neq

Mathematical description:

\[
leq(x,y) =
\begin{cases}
1 & \text{if } x \le y \\
0 & \text{otherwise}
\end{cases}
\]

The functions `geq` and `greq` both mean greater-than-or-equal.

```text
# Less-than-or-equal

leq(x, y) =
  isZero(sub(x, y));

# Greater-than-or-equal

geq(x, y) =
  leq(y, x);

# Alias with a longer name

greq(x, y) =
  geq(x, y);

# Strict comparisons

lt(x, y) =
  leq(succ(x), y);

gt(x, y) =
  lt(y, x);

# Equality and inequality

eq(x, y) =
  boolAnd(leq(x, y), geq(x, y));

neq(x, y) =
  boolNot(eq(x, y));
```

---

## 10. Conditional Selection: ifZero, ifNonZero, and ite

Mathematical description:

\[
ifZero(a,b,0) = a
\]

\[
ifZero(a,b,c+1) = b
\]

The function `ite(condition, thenValue, elseValue)` is an if-then-else:

\[
ite(c,a,b) =
\begin{cases}
a & \text{if } c > 0 \\
b & \text{if } c = 0
\end{cases}
\]

```text
# ifZero returns thenValue when condition is zero,
# otherwise it returns elseValue.

ifZeroBase(thenValue, elseValue) =
  thenValue;

ifZeroStep(thenValue, elseValue, y, previous) =
  elseValue;

ifZero(thenValue, elseValue, condition) =
  primrec(ifZeroBase, ifZeroStep);

# ifNonZero reverses the zero case.

ifNonZero(condition, thenValue, elseValue) =
  ifZero(elseValue, thenValue, condition);

# Common if-then-else name.

ite(condition, thenValue, elseValue) =
  ifNonZero(condition, thenValue, elseValue);
```

---

## 11. Minimum, Maximum, and Clamping

Mathematical description:

\[
min2(x,y) =
\begin{cases}
x & \text{if } x \le y \\
y & \text{otherwise}
\end{cases}
\]

\[
max2(x,y) =
\begin{cases}
x & \text{if } x \ge y \\
y & \text{otherwise}
\end{cases}
\]

```text
# Minimum and maximum

min2(x, y) =
  ite(leq(x, y), x, y);

max2(x, y) =
  ite(geq(x, y), x, y);

# Clamp x into the interval [lower, upper].

clamp(x, lower, upper) =
  min2(max2(x, lower), upper);
```

---

## 12. Parity: odd and even

Mathematical description:

\[
odd(0) = 0
\]

\[
odd(y+1) = 1 - odd(y)
\]

So `odd(n)` returns `1` for odd numbers and `0` for even numbers.

```text
# Toggle between 0 and 1 at every successor step.

oddBase() =
  0;

oddStep(y, previous) =
  boolNot(previous);

odd(n) = primrec(oddBase, oddStep);

even(n) =
  boolNot(odd(n));
```

---

## 13. Modulo

Mathematical description:

For a positive divisor \(d\), `mod(d,n)` computes the remainder of \(n\)
divided by \(d\):

\[
mod(d,n) = n \bmod d
\]

The recursion repeatedly advances the previous remainder and resets it to
`0` whenever it reaches the divisor.

For `d = 0`, this total natural-number version returns `n`.

```text
# Remainder of n modulo divisor.
# The first argument is the divisor, the second argument is the number.

modBase(divisor) =
  0;

modStep(divisor, y, previous) =
  ite(eq(succ(previous), divisor), 0, succ(previous));

mod(divisor, n) =
  primrec(modBase, modStep);
```

---

## 14. Quotient and Divisibility

Mathematical description:

For \(d > 0\), `quot(d,n)` computes integer division:

\[
quot(d,n) = \lfloor n / d \rfloor
\]

The function `divides(d,n)` returns `1` exactly when \(d\) divides \(n\).

```text
# Integer quotient for positive divisors.
# For divisor = 0, this total version returns 0.

quotBase(divisor) =
  0;

quotStep(divisor, y, previous) =
  ite(eq(mod(divisor, succ(y)), 0), succ(previous), previous);

quot(divisor, n) =
  primrec(quotBase, quotStep);

# Divisibility test.
# With divisor = 0, this returns 1 only for n = 0.

divides(divisor, n) =
  eq(mod(divisor, n), 0);
```

---

## 15. Bounded Counting

Mathematical description:

`countUpTo(limit,n)` counts how many numbers from `0` through `n` are at most
`limit`.

\[
countUpTo(limit,n) =
|\{ k \mid 0 \le k \le n \text{ and } k \le limit \}|
\]

```text
# Count the values k in 0..n with k <= limit.

countUpToBase(limit) =
  ite(leq(0, limit), 1, 0);

countUpToStep(limit, y, previous) =
  plus(previous, ite(leq(succ(y), limit), 1, 0));

countUpTo(limit, n) =
  primrec(countUpToBase, countUpToStep);
```

---

## 16. Bounded Summation of a Function

Mathematical description:

`sumOddFlags(n)` counts how many odd numbers appear from `0` through `n`.

\[
sumOddFlags(n) = odd(0) + odd(1) + \dots + odd(n)
\]

```text
# Count odd numbers from 0 through n.

sumOddFlagsBase() =
  odd(0);

sumOddFlagsStep(y, previous) =
  plus(previous, odd(succ(y)));

sumOddFlags(n) =
  primrec(sumOddFlagsBase, sumOddFlagsStep);
```

---

## 17. Cantor Pairing

Mathematical description:

The Cantor pairing function encodes two natural numbers as one natural number:

\[
pair(a,b) = tri(a+b) + b
\]

The functions `pairFirst(z)` and `pairSecond(z)` decode the first and second
component again.

```text
# Cantor pairing.

pair(a, b) =
  plus(tri(plus(a, b)), b);

# Largest w such that tri(w) <= z, found by bounded search up to z.

wBoundBase(z) =
  0;

wBoundStep(z, y, previous) =
  ite(leq(tri(succ(y)), z), succ(y), previous);

wBound(z, limit) =
  primrec(wBoundBase, wBoundStep);

w(z) =
  wBound(z, z);

# Decode the second and first components.

pairSecond(z) =
  sub(z, tri(w(z)));

pairFirst(z) =
  sub(w(z), pairSecond(z));
```

---

## 18. Fibonacci

Mathematical description:

\[
fib(0) = 0
\]

\[
fib(1) = 1
\]

\[
fib(n+2) = fib(n+1) + fib(n)
\]

The code stores the pair \((fib(n), fib(n+1))\) during recursion.

```text
# Fibonacci using encoded pairs.

fibPairBase() =
  pair(0, 1);

fibPairStep(y, previous) =
  pair(
    pairSecond(previous),
    plus(pairFirst(previous), pairSecond(previous))
  );

fibPair(n) =
  primrec(fibPairBase, fibPairStep);

fib(n) =
  pairFirst(fibPair(n));
```

---

## 19. Select the Smaller Non-Zero Value

Mathematical description:

`minPositive(x,y)` returns:

- `y` if `x = 0`
- `x` if `y = 0`
- `min(x,y)` otherwise

```text
# Choose the smaller positive value, treating 0 as "missing".

minPositive(x, y) =
  ite(
    isZero(x),
    y,
    ite(isZero(y), x, min2(x, y))
  );
```

---

## 20. Bounded Least Non-Trivial Divisor

Mathematical description:

`leastNonTrivialDivisor(n,limit)` searches the candidates:

\[
2,3,\dots,limit+1
\]

It returns the smallest candidate that divides `n`, or `0` if no such
candidate is found in the bounded search range.

```text
# Candidate y represents the actual divisor y + 2.

candidateDivisor(y) =
  plus(y, 2);

isNonTrivialDivisor(n, candidate) =
  divides(candidate, n);

keepFirst(current, candidate) =
  ite(isNonZero(current), current, candidate);

leastDivisorBase(n) =
  0;

leastDivisorStep(n, y, previous) =
  keepFirst(
    previous,
    ite(
      isNonTrivialDivisor(n, candidateDivisor(y)),
      candidateDivisor(y),
      0
    )
  );

leastNonTrivialDivisor(n, limit) =
  primrec(leastDivisorBase, leastDivisorStep);
```

---

## 21. Bounded Primality Test

Mathematical description:

For \(n \ge 2\), a number is prime if no non-trivial divisor is found up to
`n - 1`. The function below is bounded and total over all natural numbers.

It returns `1` for prime numbers and `0` otherwise.

```text
# Prime test using the bounded divisor search above.

hasNoSmallDivisor(n) =
  isZero(leastNonTrivialDivisor(n, sub(n, 2)));

isAtLeastTwo(n) =
  geq(n, 2);

isPrime(n) =
  boolAnd(isAtLeastTwo(n), hasNoSmallDivisor(n));
```
