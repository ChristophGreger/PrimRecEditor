import { useCallback, useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { BeforeMount, OnMount } from '@monaco-editor/react';
import { AlertTriangle, CheckCircle2, FileJson2, Play } from 'lucide-react';
import {
  LANGUAGE_ID,
  registerPrimRecLanguage,
  updatePrimRecMarkers,
} from '../editor/primRecMonaco';
import { COMPLETION_EXAMPLE } from '../primrecLanguage/constants';
import { parsePrimRecProgram } from '../primrecLanguage';

export function PrimRecEditor() {
  const [code, setCode] = useState(COMPLETION_EXAMPLE);
  const parsed = useMemo(() => parsePrimRecProgram(code), [code]);
  const hasErrors = parsed.diagnostics.some((item) => item.severity === 'error');

  const handleBeforeMount: BeforeMount = useCallback((monaco) => {
    registerPrimRecLanguage(monaco);
  }, []);

  const handleMount: OnMount = useCallback((editor, monaco) => {
    updatePrimRecMarkers(monaco, editor.getModel());
    editor.onDidChangeModelContent(() => {
      updatePrimRecMarkers(monaco, editor.getModel());
    });
  }, []);

  function handleParse() {
    console.log('Parsed primitive recursive program:', parsed);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Primitive Recursive Function Language</p>
          <h1>PrimRec Editor</h1>
        </div>
        <button className="primary-button" type="button" onClick={handleParse}>
          <Play size={16} aria-hidden="true" />
          Parse
        </button>
      </header>

      <section className="workspace" aria-label="Primitive recursive function editor">
        <div className="editor-pane">
          <Editor
            beforeMount={handleBeforeMount}
            language={LANGUAGE_ID}
            theme="primrec-dark"
            value={code}
            onChange={(value) => setCode(value ?? '')}
            onMount={handleMount}
            options={{
              automaticLayout: true,
              fontSize: 14,
              fontLigatures: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              tabSize: 2,
              wordWrap: 'on',
            }}
          />
        </div>

        <aside className="inspector" aria-label="Parser output">
          <div className={hasErrors ? 'status status-error' : 'status status-ok'}>
            {hasErrors ? (
              <AlertTriangle size={18} aria-hidden="true" />
            ) : (
              <CheckCircle2 size={18} aria-hidden="true" />
            )}
            <span>
              {hasErrors
                ? `${parsed.diagnostics.length} diagnostic(s)`
                : `${parsed.program?.functions.length ?? 0} function(s) parsed`}
            </span>
          </div>

          <section className="diagnostics-panel" aria-label="Diagnostics">
            <h2>Diagnostics</h2>
            {parsed.diagnostics.length === 0 ? (
              <p className="empty-state">No parser or validation errors.</p>
            ) : (
              <ul className="diagnostics-list">
                {parsed.diagnostics.map((item, index) => (
                  <li key={`${item.code}-${index}`}>
                    <strong>{item.code}</strong>
                    <span>{item.message}</span>
                    <small>
                      line {item.range.start.line}, column {item.range.start.column}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="output-panel" aria-label="Normalized parser output">
            <h2>
              <FileJson2 size={16} aria-hidden="true" />
              Parsed Output
            </h2>
            <pre>{JSON.stringify(parsed.program ?? parsed.ast, null, 2)}</pre>
          </section>
        </aside>
      </section>
    </main>
  );
}
