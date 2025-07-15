import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import StackBarChart from '../components/StackBarChart';
import React from 'react';
import { CustomXTick, CustomYTick } from '../components/StackBarChart';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));
vi.mock('recharts', (importOriginal: () => Promise<any>) => {
  return importOriginal().then((original) => ({
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <svg role="application">{children}</svg>
    ),
    Bar: () => <rect data-testid="bar" />, // Just render a rect for each Bar
    CartesianGrid: () => <g data-testid="cartesian-grid" />,
    XAxis: ({ tick }: any) => <g data-testid="x-axis">{tick && tick({ x: 10, y: 20, payload: { value: 'Jan' }, theme: 'light' })}</g>,
    YAxis: ({ tick }: any) => <g data-testid="y-axis">{tick && tick({ x: 10, y: 20, payload: { value: 10 }, theme: 'light' })}</g>,
  }));
});
import { useTheme } from '../contexts/ThemeContextUtils';

describe('StackBarChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the chart in light theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StackBarChart />);
    const svg = screen.getByRole('application');
    expect(svg).toBeInTheDocument();
    
    expect(svg.querySelectorAll('rect[data-testid="bar"]').length).toBe(2);
    
    expect(svg.querySelector('g[data-testid="cartesian-grid"]')).toBeInTheDocument();
    expect(svg.querySelector('g[data-testid="x-axis"]')).toBeInTheDocument();
    expect(svg.querySelector('g[data-testid="y-axis"]')).toBeInTheDocument();
  });

  it('renders the chart in dark theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<StackBarChart />);
    const svg = screen.getByRole('application');
    expect(svg).toBeInTheDocument();
    expect(svg.querySelectorAll('rect[data-testid="bar"]').length).toBe(2);
  });

  it('renders CustomXTick with correct color for light and dark themes', () => {
    
    const { container: c1 } = render(
      <svg>
        <g>
          <CustomXTick x={10} y={20} payload={{ value: 'Jan' }} theme="light" />
        </g>
      </svg>
    );
    expect(c1.querySelector('text')).toHaveAttribute('fill', 'rgba(28, 28, 28, 0.4)');
    
    const { container: c2 } = render(
      <svg>
        <g>
          <CustomXTick x={10} y={20} payload={{ value: 'Jan' }} theme="dark" />
        </g>
      </svg>
    );
    expect(c2.querySelector('text')).toHaveAttribute('fill', 'rgba(255, 255, 255, 0.4)');
  });

  it('renders CustomYTick with correct color and value for light and dark themes', () => {
    
    const { container: c1 } = render(
      <svg>
        <g>
          <CustomYTick x={10} y={20} payload={{ value: 10 }} theme="light" />
        </g>
      </svg>
    );
    expect(c1.querySelector('text')).toHaveAttribute('fill', 'rgba(28, 28, 28, 0.4)');
    expect(c1.querySelector('text')?.textContent).toContain('10M');
    
    const { container: c2 } = render(
      <svg>
        <g>
          <CustomYTick x={10} y={20} payload={{ value: 0 }} theme="dark" />
        </g>
      </svg>
    );
    expect(c2.querySelector('text')).toHaveAttribute('fill', 'rgba(255, 255, 255, 0.4)');
    expect(c2.querySelector('text')?.textContent).toContain('0');
  });
});
