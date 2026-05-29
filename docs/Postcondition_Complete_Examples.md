# Complete PrimRec Examples With Postconditions

This file contains standalone examples for the PrimRec editor. Every code block
defines all user functions it uses, so each block can be pasted into the editor
on its own.

Built-ins are not redefined: `zero()` and `succ(x)` are always available.

---

## 1. Addition, Increment, and Doubling

```text
# Addition by primitive recursion over y.

plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

inc(x) =
  succ(x);

double(x) =
  plus(x, x);

post plus(x, y) -> r {
  r == x + y;
}

post inc(x) -> r {
  r == x + 1;
}

post double(x) -> r {
  r == 2 * x;
}
```

---

## 2. Predecessor, Truncated Subtraction, and Absolute Difference

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

absDiff(x, y) =
  plus(sub(x, y), sub(y, x));

post pred(x) -> r {
  x == 0 => r == 0;
  x > 0 => r == x - 1;
}

post sub(x, y) -> r {
  x >= y => r == x - y;
  x < y => r == 0;
  r <= x;
}

post absDiff(x, y) -> r {
  x >= y => r == x - y;
  y >= x => r == y - x;
}
```

---

## 3. Multiplication, Square, and Cube

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

square(x) =
  mul(x, x);

cube(x) =
  mul(square(x), x);

post mul(x, y) -> r {
  r == x * y;
}

post square(x) -> r {
  r == x * x;
}

post cube(x) -> r {
  r == x * x * x;
}
```

---

## 4. Exponentiation and Fixed Bases

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

expBase(x) =
  1;

expStep(x, y, previous) =
  mul(previous, x);

exp(x, y) = primrec(expBase, expStep);

pow2(n) =
  exp(2, n);

pow3(n) =
  exp(3, n);

post exp(x, y) -> r {
  r == x ** y;
  y == 0 => r == 1;
  y > 0 => exists previous. r == previous * x;
}

post pow2(n) -> r {
  r == 2 ** n;
}

post pow3(n) -> r {
  r == 3 ** n;
}
```

---

## 5. Factorial

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

factBase() =
  1;

factStep(y, previous) =
  mul(succ(y), previous);

fact(n) = primrec(factBase, factStep);

post fact(n) -> r {
  n == 0 => r == 1;
  n > 0 => r >= n;
  forall k. n == k + 1 => r == (k + 1) * fact(k);
}
```

---

## 6. Triangular Numbers and Sum of Squares

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

square(x) =
  mul(x, x);

triBase() =
  0;

triStep(y, previous) =
  plus(previous, succ(y));

tri(n) = primrec(triBase, triStep);

sumSquaresBase() =
  0;

sumSquaresStep(y, previous) =
  plus(previous, square(succ(y)));

sumSquares(n) = primrec(sumSquaresBase, sumSquaresStep);

post tri(n) -> r {
  r == (n * (n + 1)) div 2;
}

post sumSquares(n) -> r {
  r == (n * (n + 1) * (2 * n + 1)) div 6;
}
```

---

## 7. Boolean Values Over Naturals

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

isNonZero(x) =
  isZero(isZero(x));

boolNot(b) =
  isZero(b);

boolAnd(a, b) =
  mul(a, b);

boolOr(a, b) =
  isNonZero(plus(a, b));

post isZero(x) -> r {
  r == 0 || r == 1;
  r == 1 <=> x == 0;
}

post isNonZero(x) -> r {
  r == 0 || r == 1;
  r == 1 <=> x > 0;
}

post boolNot(b) -> r {
  b == 0 => r == 1;
  b > 0 => r == 0;
}

post boolAnd(a, b) -> r {
  r == a * b;
}

post boolOr(a, b) -> r {
  r == 0 || r == 1;
  r == 1 <=> a + b > 0;
}
```

---

## 8. Comparisons

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

boolNot(b) =
  isZero(b);

boolAnd(a, b) =
  mul(a, b);

leq(x, y) =
  isZero(sub(x, y));

geq(x, y) =
  leq(y, x);

lt(x, y) =
  leq(succ(x), y);

gt(x, y) =
  lt(y, x);

eq(x, y) =
  boolAnd(leq(x, y), geq(x, y));

neq(x, y) =
  boolNot(eq(x, y));

post leq(x, y) -> r {
  r == 0 || r == 1;
  r == 1 <=> x <= y;
}

post lt(x, y) -> r {
  r == 0 || r == 1;
  r == 1 <=> x < y;
}

post eq(x, y) -> r {
  r == 0 || r == 1;
  r == 1 <=> x == y;
}

post neq(x, y) -> r {
  r == 0 || r == 1;
  r == 1 <=> x != y;
}
```

---

## 9. Min, Max, and Clamp

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

isNonZero(x) =
  isZero(isZero(x));

boolAnd(a, b) =
  mul(a, b);

leq(x, y) =
  isZero(sub(x, y));

geq(x, y) =
  leq(y, x);

ifZeroBase(thenValue, elseValue) =
  thenValue;

ifZeroStep(thenValue, elseValue, y, previous) =
  elseValue;

ifZero(thenValue, elseValue, condition) =
  primrec(ifZeroBase, ifZeroStep);

ifNonZero(condition, thenValue, elseValue) =
  ifZero(elseValue, thenValue, condition);

iteValue(condition, thenValue, elseValue) =
  ifNonZero(condition, thenValue, elseValue);

min2(x, y) =
  iteValue(leq(x, y), x, y);

max2(x, y) =
  iteValue(geq(x, y), x, y);

clamp(x, lower, upper) =
  min2(max2(x, lower), upper);

post min2(x, y) -> r {
  r <= x;
  r <= y;
  r == x || r == y;
}

post max2(x, y) -> r {
  r >= x;
  r >= y;
  r == x || r == y;
}

post clamp(x, lower, upper) -> r {
  lower <= upper => r >= lower;
  lower <= upper => r <= upper;
  lower <= upper && x >= lower && x <= upper => r == x;
}
```

---

## 10. Parity and Counting Odd Numbers

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

boolNot(b) =
  isZero(b);

oddBase() =
  0;

oddStep(y, previous) =
  boolNot(previous);

odd(n) = primrec(oddBase, oddStep);

even(n) =
  boolNot(odd(n));

sumOddFlagsBase() =
  odd(0);

sumOddFlagsStep(y, previous) =
  plus(previous, odd(succ(y)));

sumOddFlags(n) =
  primrec(sumOddFlagsBase, sumOddFlagsStep);

post odd(n) -> r {
  r == 0 || r == 1;
  r == 1 <=> n mod 2 == 1;
}

post even(n) -> r {
  r == 0 || r == 1;
  r == 1 <=> n mod 2 == 0;
}

post sumOddFlags(n) -> r {
  r == (n + 1) div 2;
}
```

---

## 11. Modulo, Quotient, and Divisibility

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

boolAnd(a, b) =
  mul(a, b);

leq(x, y) =
  isZero(sub(x, y));

geq(x, y) =
  leq(y, x);

eq(x, y) =
  boolAnd(leq(x, y), geq(x, y));

ifZeroBase(thenValue, elseValue) =
  thenValue;

ifZeroStep(thenValue, elseValue, y, previous) =
  elseValue;

ifZero(thenValue, elseValue, condition) =
  primrec(ifZeroBase, ifZeroStep);

ifNonZero(condition, thenValue, elseValue) =
  ifZero(elseValue, thenValue, condition);

iteValue(condition, thenValue, elseValue) =
  ifNonZero(condition, thenValue, elseValue);

modBase(divisor) =
  0;

modStep(divisor, y, previous) =
  iteValue(eq(succ(previous), divisor), 0, succ(previous));

mod(divisor, n) =
  primrec(modBase, modStep);

quotBase(divisor) =
  0;

quotStep(divisor, y, previous) =
  iteValue(eq(mod(divisor, succ(y)), 0), succ(previous), previous);

quot(divisor, n) =
  primrec(quotBase, quotStep);

divides(divisor, n) =
  eq(mod(divisor, n), 0);

post mod(divisor, n) -> r {
  divisor > 0 => r == n mod divisor;
  divisor > 0 => r < divisor;
  divisor == 0 => r == n;
}

post quot(divisor, n) -> r {
  divisor > 0 => r == n div divisor;
  divisor == 0 => r == 0;
}

post divides(divisor, n) -> r {
  r == 0 || r == 1;
  divisor > 0 => (r == 1 <=> n mod divisor == 0);
  divisor == 0 => (r == 1 <=> n == 0);
}
```

---

## 12. Bounded Counting

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

leq(x, y) =
  isZero(sub(x, y));

ifZeroBase(thenValue, elseValue) =
  thenValue;

ifZeroStep(thenValue, elseValue, y, previous) =
  elseValue;

ifZero(thenValue, elseValue, condition) =
  primrec(ifZeroBase, ifZeroStep);

ifNonZero(condition, thenValue, elseValue) =
  ifZero(elseValue, thenValue, condition);

iteValue(condition, thenValue, elseValue) =
  ifNonZero(condition, thenValue, elseValue);

countUpToBase(limit) =
  iteValue(leq(0, limit), 1, 0);

countUpToStep(limit, y, previous) =
  plus(previous, iteValue(leq(succ(y), limit), 1, 0));

countUpTo(limit, n) =
  primrec(countUpToBase, countUpToStep);

post countUpTo(limit, n) -> r {
  n <= limit => r == n + 1;
  n > limit => r == limit + 1;
}
```

---

## 13. Cantor Pairing

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

leq(x, y) =
  isZero(sub(x, y));

ifZeroBase(thenValue, elseValue) =
  thenValue;

ifZeroStep(thenValue, elseValue, y, previous) =
  elseValue;

ifZero(thenValue, elseValue, condition) =
  primrec(ifZeroBase, ifZeroStep);

ifNonZero(condition, thenValue, elseValue) =
  ifZero(elseValue, thenValue, condition);

iteValue(condition, thenValue, elseValue) =
  ifNonZero(condition, thenValue, elseValue);

triBase() =
  0;

triStep(y, previous) =
  plus(previous, succ(y));

tri(n) = primrec(triBase, triStep);

pair(a, b) =
  plus(tri(plus(a, b)), b);

wBoundBase(z) =
  0;

wBoundStep(z, y, previous) =
  iteValue(leq(tri(succ(y)), z), succ(y), previous);

wBound(z, limit) =
  primrec(wBoundBase, wBoundStep);

w(z) =
  wBound(z, z);

pairSecond(z) =
  sub(z, tri(w(z)));

pairFirst(z) =
  sub(w(z), pairSecond(z));

post tri(n) -> r {
  r == (n * (n + 1)) div 2;
}

post pair(a, b) -> r {
  let s = a + b;
  r == (s * (s + 1)) div 2 + b;
}

post pairFirst(z) -> r {
  exists second. pair(r, second) == z;
}

post pairSecond(z) -> r {
  exists first. pair(first, r) == z;
}
```

---

## 14. Fibonacci

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

leq(x, y) =
  isZero(sub(x, y));

ifZeroBase(thenValue, elseValue) =
  thenValue;

ifZeroStep(thenValue, elseValue, y, previous) =
  elseValue;

ifZero(thenValue, elseValue, condition) =
  primrec(ifZeroBase, ifZeroStep);

ifNonZero(condition, thenValue, elseValue) =
  ifZero(elseValue, thenValue, condition);

iteValue(condition, thenValue, elseValue) =
  ifNonZero(condition, thenValue, elseValue);

triBase() =
  0;

triStep(y, previous) =
  plus(previous, succ(y));

tri(n) = primrec(triBase, triStep);

pair(a, b) =
  plus(tri(plus(a, b)), b);

wBoundBase(z) =
  0;

wBoundStep(z, y, previous) =
  iteValue(leq(tri(succ(y)), z), succ(y), previous);

wBound(z, limit) =
  primrec(wBoundBase, wBoundStep);

w(z) =
  wBound(z, z);

pairSecond(z) =
  sub(z, tri(w(z)));

pairFirst(z) =
  sub(w(z), pairSecond(z));

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

post fib(n) -> r {
  n == 0 => r == 0;
  n == 1 => r == 1;
  forall k. n == k + 2 => r == fib(k + 1) + fib(k);
}
```

---

## 15. Bounded Prime Test

```text
plusBase(x) =
  x;

plusStep(x, y, previous) =
  succ(previous);

plus(x, y) = primrec(plusBase, plusStep);

predBase() =
  0;

predStep(y, previous) =
  y;

pred(x) = primrec(predBase, predStep);

subBase(x) =
  x;

subStep(x, y, previous) =
  pred(previous);

sub(x, y) = primrec(subBase, subStep);

mulBase(x) =
  0;

mulStep(x, y, previous) =
  plus(previous, x);

mul(x, y) = primrec(mulBase, mulStep);

isZeroBase() =
  1;

isZeroStep(y, previous) =
  0;

isZero(x) = primrec(isZeroBase, isZeroStep);

isNonZero(x) =
  isZero(isZero(x));

boolNot(b) =
  isZero(b);

boolAnd(a, b) =
  mul(a, b);

leq(x, y) =
  isZero(sub(x, y));

geq(x, y) =
  leq(y, x);

eq(x, y) =
  boolAnd(leq(x, y), geq(x, y));

ifZeroBase(thenValue, elseValue) =
  thenValue;

ifZeroStep(thenValue, elseValue, y, previous) =
  elseValue;

ifZero(thenValue, elseValue, condition) =
  primrec(ifZeroBase, ifZeroStep);

ifNonZero(condition, thenValue, elseValue) =
  ifZero(elseValue, thenValue, condition);

iteValue(condition, thenValue, elseValue) =
  ifNonZero(condition, thenValue, elseValue);

modBase(divisor) =
  0;

modStep(divisor, y, previous) =
  iteValue(eq(succ(previous), divisor), 0, succ(previous));

mod(divisor, n) =
  primrec(modBase, modStep);

divides(divisor, n) =
  eq(mod(divisor, n), 0);

candidateDivisor(y) =
  plus(y, 2);

isNonTrivialDivisor(n, candidate) =
  divides(candidate, n);

keepFirst(current, candidate) =
  iteValue(isNonZero(current), current, candidate);

leastDivisorBase(n) =
  0;

leastDivisorStep(n, y, previous) =
  keepFirst(
    previous,
    iteValue(
      isNonTrivialDivisor(n, candidateDivisor(y)),
      candidateDivisor(y),
      0
    )
  );

leastNonTrivialDivisor(n, limit) =
  primrec(leastDivisorBase, leastDivisorStep);

hasNoSmallDivisor(n) =
  isZero(leastNonTrivialDivisor(n, sub(n, 2)));

isAtLeastTwo(n) =
  geq(n, 2);

isPrime(n) =
  boolAnd(isAtLeastTwo(n), hasNoSmallDivisor(n));

post leastNonTrivialDivisor(n, limit) -> r {
  r == 0 || (r >= 2 && r <= limit + 2);
  r > 0 => n mod r == 0;
}

post isPrime(n) -> r {
  r == 0 || r == 1;
  n < 2 => r == 0;
  r == 1 => forall d. d >= 2 && d < n => n mod d != 0;
  r == 0 && n >= 2 => exists d. d >= 2 && d < n && n mod d == 0;
}
```
