import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LineChartLegend } from '../components/LineChartLegend';

describe('LineChartLegend', () => {
  it('renders the color dot, text, and boldText correctly', () => {
    render(<LineChartLegend color="#ff0000" text="Legend" boldText="Value" />);
    const dot = (screen.getByText('Legend').previousSibling as HTMLElement)?.querySelector('div');
    expect(dot).toHaveStyle({ backgroundColor: '#ff0000' });
    expect(screen.getByText('Legend')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
    expect(screen.getByText('Value').tagName).toBe('SPAN');
    expect(screen.getByText('Value')).toHaveClass('font-semibold');
  });
}); 