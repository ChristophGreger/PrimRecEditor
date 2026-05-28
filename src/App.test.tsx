import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the editor shell', () => {
    render(<App />);
    expect(screen.getByText('PrimRec Editor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /parse/i })).toBeInTheDocument();
  });
});
