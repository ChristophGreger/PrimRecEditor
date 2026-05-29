import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders the editor shell', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /print smt2/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Monaco editor')).toBeInTheDocument();
  });

  it('prints formatted SMT-LIB output from the editor source', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /print smt2/i }));

    expect(log).toHaveBeenCalledWith(expect.stringContaining('(set-logic HORN)\n\n'));
    expect(log).toHaveBeenCalledWith(expect.stringContaining('\n  (forall '));
  });
});
