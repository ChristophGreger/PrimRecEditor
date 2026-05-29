import { describe, expect, it } from 'vitest';
import {
  parsePrimRecProgram,
  primRecProgramToHornSmt2,
  primRecProgramToHornSmt2Parts,
} from '..';

function generate(source: string): string {
  const parsed = parsePrimRecProgram(source);
  expect(parsed.diagnostics).toEqual([]);
  return primRecProgramToHornSmt2(parsed);
}

describe('primRecProgramToHornSmt2', () => {
  it('emits modular Horn SMT-LIB sections', () => {
    const parsed = parsePrimRecProgram('id(x) = x;');
    const parts = primRecProgramToHornSmt2Parts(parsed);

    expect(parts[0]).toBe('(set-logic HORN)');
    expect(parts[1]).toContain('(define-fun _nat');
    expect(parts[2]).toBe('(declare-fun id (Int Int) Bool)');
    expect(parts[3]).toContain('(id x r)');
  });

  it('lowers plain expressions and nested composition through temporaries', () => {
    const smt2 = generate(`h(x) = succ(x);
z(n) = zero();
g(a, b) = succ(a);
f(x, n) = g(h(x), z(n));`);

    expect(smt2).toContain('(declare-fun f (Int Int Int) Bool)');
    expect(smt2).toContain('(= arg0_1 x)');
    expect(smt2).toContain('(h arg0_1 arg0)');
    expect(smt2).toContain('(= arg0_2 n)');
    expect(smt2).toContain('(z arg0_2 arg1)');
    expect(smt2).toContain('(g arg0 arg1 r)');
    expect(smt2).toContain('(f x n r)');
  });

  it('keeps the result variable distinct from user parameters', () => {
    const smt2 = generate('constZero(r) = zero();');

    expect(smt2).toContain('(forall ((r Int) (r_1 Int))');
    expect(smt2).toContain('(= r_1 0)');
    expect(smt2).toContain('(constZero r r_1)');
    expect(smt2).not.toContain('(constZero r r)');
  });

  it('does not collide with user functions named Nat', () => {
    const smt2 = generate('Nat(x) = x;');

    expect(smt2).toContain('(define-fun _nat');
    expect(smt2).toContain('(declare-fun Nat (Int Int) Bool)');
    expect(smt2).toContain('(_nat x)');
    expect(smt2).toContain('(Nat x r)');
  });

  it('uses recognized linear recurrence idioms instead of generic recursion', () => {
    const smt2 = generate(`plusBase(x) = x;
plusStep(x, y, previous) = succ(previous);
plus(x, y) = primrec(plusBase, plusStep);`);

    expect(smt2).toContain('(plusBase x baseResult)');
    expect(smt2).toContain('(= succArg 0)');
    expect(smt2).toContain('(= increment (+ succArg 1))');
    expect(smt2).toContain('(= r (+ baseResult (* y increment)))');
    expect(smt2).not.toContain('previousCounter');
  });

  it('uses closed Horn rules for predecessor and constant-after-first idioms', () => {
    const smt2 = generate(`one() = succ(zero());
predBase() = zero();
predStep(y, previous) = y;
pred(x) = primrec(predBase, predStep);
isZeroBase() = one();
isZeroStep(y, previous) = zero();
isZero(x) = primrec(isZeroBase, isZeroStep);`);

    expect(smt2).toContain('(predBase r)');
    expect(smt2).toContain('(= r (- x 1))');
    expect(smt2).toContain('(isZeroBase r)');
    expect(smt2).toContain('(> x 0)');
    expect(smt2).toContain('(= r 0)');
  });

  it('falls back to generic primitive recursion when no idiom matches', () => {
    const smt2 = generate(`plusBase(x) = x;
plusStep(x, y, previous) = succ(previous);
plus(x, y) = primrec(plusBase, plusStep);
weirdBase(x) = x;
weirdStep(x, y, previous) = plus(x, y);
weird(x, y) = primrec(weirdBase, weirdStep);`);

    expect(smt2).toContain('(= y 0)');
    expect(smt2).toContain('(weirdBase x r)');
    expect(smt2).toContain('(= y (+ previousCounter 1))');
    expect(smt2).toContain('(weird x previousCounter previous)');
    expect(smt2).toContain('(weirdStep x previousCounter previous r)');
  });

  it('rejects invalid parse results', () => {
    const parsed = parsePrimRecProgram('f(x) = missing(x);');

    expect(() => primRecProgramToHornSmt2Parts(parsed)).toThrow(
      'Cannot generate Horn SMT-LIB',
    );
  });
});
