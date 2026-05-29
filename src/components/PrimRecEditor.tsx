import { useCallback, useState } from 'react';
import Editor from '@monaco-editor/react';
import type { BeforeMount, OnMount } from '@monaco-editor/react';
import {
  LANGUAGE_ID,
  registerPrimRecLanguage,
  updatePrimRecMarkers,
} from '../editor/primRecMonaco';
import { COMPLETION_EXAMPLE } from '../primrecLanguage/constants';
import { printToSmt2 } from '../primrecLanguage';

export function PrimRecEditor() {
  const [code, setCode] = useState(COMPLETION_EXAMPLE);

  const handleBeforeMount: BeforeMount = useCallback((monaco) => {
    registerPrimRecLanguage(monaco);
  }, []);

  const handleMount: OnMount = useCallback((editor, monaco) => {
    updatePrimRecMarkers(monaco, editor.getModel());
    editor.onDidChangeModelContent(() => {
      updatePrimRecMarkers(monaco, editor.getModel());
    });
  }, []);

  function handlePrintToSmt2() {
    printToSmt2(code);
  }

  return (
    <main className="monaco-loader">
      <button className="load-button" type="button" onClick={handlePrintToSmt2}>
        Print SMT2
      </button>
      <section className="editor-pane" aria-label="Monaco editor">
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
            minimap: { enabled: false },
            'semanticHighlighting.enabled': true,
          }}
        />
      </section>
    </main>
  );
}
