import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the editor shell', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /load/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Monaco editor')).toBeInTheDocument();
  });
});
