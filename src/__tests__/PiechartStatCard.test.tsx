import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PiechartStatCard from '../components/PiechartStatCard';

describe('PiechartStatCard', () => {
  it('renders the color dot, title, and value correctly', () => {
    render(<PiechartStatCard color="#00ff00" title="Revenue" value="$123" />);
    const dot = (screen.getByText('Revenue').previousSibling as HTMLElement)?.querySelector('div');
    expect(dot).toHaveStyle({ backgroundColor: '#00ff00' });
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$123')).toBeInTheDocument();
  });
}); 