import { describe, expect, it } from 'vitest';
import { parsePrimRecProgram } from '.';

describe('parsePrimRecProgram valid programs', () => {
  it('normalizes the addition example', () => {
    const result = parsePrimRecProgram(`plusBase(x) = x;
plusStep(x, y, previous) = succ(previous);
plus(x, y) = primrec(plusBase, plusStep);`);

    expect(result.diagnostics).toEqual([]);
    expect(result.program?.functions.map((item) => item.name)).toEqual([
      'plusBase',
      'plusStep',
      'plus',
    ]);
    expect(result.program?.functions[2].expression).toEqual({
      kind: 'PrimitiveRecursion',
      base: 'plusBase',
      step: 'plusStep',
    });
  });

  it('expands numeric literals into the primitive core', () => {
    const result = parsePrimRecProgram('two(x) = 2;');

    expect(result.diagnostics).toEqual([]);
    expect(result.program?.functions[0].expression).toEqual({
      kind: 'Successor',
      argument: {
        kind: 'Successor',
        argument: { kind: 'Zero' },
      },
    });
  });
});
