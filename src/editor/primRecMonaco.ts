import type * as Monaco from 'monaco-editor';
import {
  getFunctionSignatures,
  getSemanticHover,
  LANGUAGE_ID,
  parsePrimRecProgram,
} from '../primrecLanguage';
import type { Diagnostic } from '../primrecLanguage';

const MARKER_OWNER = 'primrec-parser';
let registered = false;

type MonacoApi = typeof Monaco;

export function registerPrimRecLanguage(monaco: MonacoApi) {
  if (registered) {
    return;
  }

  monaco.languages.register({
    id: LANGUAGE_ID,
    extensions: ['.primrec', '.prf'],
    aliases: ['Primitive Recursive Functions', 'PrimRec'],
  });

  monaco.languages.setLanguageConfiguration(LANGUAGE_ID, {
    comments: {
      lineComment: '#',
      blockComment: ['/*', '*/'],
    },
    brackets: [['(', ')']],
    autoClosingPairs: [
      { open: '(', close: ')' },
      { open: '/*', close: '*/' },
    ],
    surroundingPairs: [{ open: '(', close: ')' }],
  });

  monaco.languages.setMonarchTokensProvider(LANGUAGE_ID, {
    defaultToken: '',
    keywords: ['zero', 'succ', 'primrec'],
    tokenizer: {
      root: [
        [/#.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],
        [/\b(zero|succ|primrec)\b/, 'keyword'],
        [/[=]/, 'operator'],
        [/[(),;]/, 'delimiter'],
        [/[0-9]+/, 'number'],
        [/[A-Za-z_][A-Za-z0-9_]*/, 'identifier'],
      ],
      comment: [
        [/[^/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[/*]/, 'comment'],
      ],
    },
  });

  monaco.editor.defineTheme('primrec-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '63D297', fontStyle: 'bold' },
      { token: 'identifier', foreground: 'D8DEE9' },
      { token: 'number', foreground: 'F2CC60' },
      { token: 'operator', foreground: '9CDCFE' },
      { token: 'delimiter', foreground: '8D99AE' },
      { token: 'comment', foreground: '6E7D8F', fontStyle: 'italic' },
    ],
    colors: {
      'editor.background': '#11151c',
      'editorLineNumber.foreground': '#5b6573',
      'editorLineNumber.activeForeground': '#d8dee9',
      'editorCursor.foreground': '#63d297',
      'editor.selectionBackground': '#34505f',
    },
  });

  monaco.languages.registerHoverProvider(LANGUAGE_ID, {
    provideHover(model, position) {
      const message = getSemanticHover(
        model.getValue(),
        position.lineNumber,
        position.column,
      );

      return message ? { contents: [{ value: message }] } : null;
    },
  });

  monaco.languages.registerCompletionItemProvider(LANGUAGE_ID, {
    triggerCharacters: ['(', ','],
    provideCompletionItems(model, position) {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const signatures = getFunctionSignatures(model.getValue());

      return {
        suggestions: [
          {
            label: 'zero',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'zero()',
            detail: 'zero() -> natural number',
            documentation: 'Nullary primitive function returning 0.',
            range,
          },
          {
            label: 'succ',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'succ(${1:x})',
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'succ(x) -> natural number',
            documentation: 'Unary successor primitive function.',
            range,
          },
          {
            label: 'primrec',
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: 'primrec(${1:base}, ${2:step})',
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'primrec(base, step)',
            documentation: 'Primitive recursion over the last function argument.',
            range,
          },
          ...signatures.map((signature) => ({
            label: signature.name,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${signature.name}(${signatureParameterSnippet(
              signature.arity,
            )})`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `${signature.name}/${signature.arity}`,
            range,
          })),
        ],
      };
    },
  });

  registered = true;
}

export function updatePrimRecMarkers(
  monaco: MonacoApi,
  model: Monaco.editor.ITextModel | null,
) {
  if (!model) {
    return;
  }

  const parsed = parsePrimRecProgram(model.getValue());
  monaco.editor.setModelMarkers(
    model,
    MARKER_OWNER,
    parsed.diagnostics.map((item) => toMarker(monaco, item)),
  );
}

function signatureParameterSnippet(arity: number): string {
  return Array.from({ length: arity }, (_, index) => `\${${index + 1}:x${index + 1}}`).join(', ');
}

function toMarker(
  monaco: MonacoApi,
  diagnostic: Diagnostic,
): Monaco.editor.IMarkerData {
  return {
    severity:
      diagnostic.severity === 'warning'
        ? monaco.MarkerSeverity.Warning
        : monaco.MarkerSeverity.Error,
    message: diagnostic.message,
    code: diagnostic.code,
    startLineNumber: diagnostic.range.start.line,
    startColumn: diagnostic.range.start.column,
    endLineNumber: diagnostic.range.end.line,
    endColumn: Math.max(
      diagnostic.range.end.column,
      diagnostic.range.start.column + 1,
    ),
  };
}

export { LANGUAGE_ID };
