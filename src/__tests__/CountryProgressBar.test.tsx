import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CountryProgressBar from '../components/CountryProgressBar';

describe('CountryProgressBar', () => {
  it('renders the name, stat, and progress bar with correct fill', () => {
    render(<CountryProgressBar name="USA" stat="75%" fill="75" />);
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    
    const fillBar = screen.getByText('USA').parentElement?.parentElement?.querySelector('div.absolute');
    expect(fillBar).toHaveStyle({ width: '75%' });
  });
}); 