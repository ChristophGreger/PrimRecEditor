import { describe, expect, it } from 'vitest';
import { lex } from './lexer';

describe('lex', () => {
  it('ignores line and block comments', () => {
    const result = lex(`# comment
id(x) = x; /* block
comment */
zeroUnary(x) = zero();`);

    expect(result.diagnostics).toEqual([]);
    expect(result.tokens.map((token) => token.value).filter(Boolean)).toEqual([
      'id',
      '(',
      'x',
      ')',
      '=',
      'x',
      ';',
      'zeroUnary',
      '(',
      'x',
      ')',
      '=',
      'zero',
      '(',
      ')',
      ';',
    ]);
  });

  it('reports unterminated block comments', () => {
    const result = lex('id(x) = x; /* never closed');
    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0].code).toBe('LEX_UNTERMINATED_BLOCK_COMMENT');
  });
});
