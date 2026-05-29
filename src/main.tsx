import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { printToSmt2, sourceToHornSmt2 } from './primrecLanguage';

declare global {
  interface Window {
    primrecToSmt2: typeof sourceToHornSmt2;
    printToSmt2: typeof printToSmt2;
    sourceToHornSmt2: typeof sourceToHornSmt2;
  }
}

window.primrecToSmt2 = sourceToHornSmt2;
window.printToSmt2 = printToSmt2;
window.sourceToHornSmt2 = sourceToHornSmt2;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
