import { describe, expect, it } from 'vitest';
import { parsePrimRecProgram } from '.';

function codes(source: string) {
  return parsePrimRecProgram(source).diagnostics.map((item) => item.code);
}

describe('parsePrimRecProgram diagnostics', () => {
  it('rejects unknown variables', () => {
    expect(codes('f(x) = y;')).toContain('VALIDATION_UNKNOWN_VARIABLE');
  });

  it('checks function call arity', () => {
    expect(codes('id(x) = x;\nbad(x) = id(x, x);')).toContain(
      'VALIDATION_CALL_ARITY',
    );
  });

  it('requires functions to be defined before use', () => {
    expect(codes('f(x) = g(x);\ng(x) = x;')).toContain(
      'VALIDATION_FORWARD_REFERENCE',
    );
  });

  it('checks primrec base and step arities', () => {
    expect(
      codes(`base(x) = x;
step(x) = x;
f(x, y) = primrec(base, step);`),
    ).toContain('VALIDATION_PRIMREC_ARITY');
  });

  it('rejects nested primrec expressions', () => {
    expect(
      codes(`base() = zero();
step(y, previous) = y;
f(x) = succ(primrec(base, step));`),
    ).toContain('VALIDATION_NESTED_PRIMREC');
  });
});
