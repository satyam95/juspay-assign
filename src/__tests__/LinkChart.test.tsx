import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LinkChart, { CustomXTick, CustomYTick } from '../components/LinkChart';
import React from 'react';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));
vi.mock('recharts', (importOriginal: () => Promise<any>) => {
  return importOriginal().then((original) => ({
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    LineChart: ({ children }: { children: React.ReactNode }) => (
      <svg role="application">
        <path d="M0,0L10,10" />
        <path d="M10,10L20,20" />
        <path d="M20,20L30,30" />
        {children}
      </svg>
    ),
    Line: () => null,
    CartesianGrid: () => null,
    XAxis: ({ tick }: any) => (
      <g data-testid="x-axis">{tick && tick({ x: 10, y: 20, payload: { value: 'Jan' } })}</g>
    ),
    YAxis: ({ tick }: any) => (
      <g data-testid="y-axis">{tick && tick({ x: 10, y: 20, payload: { value: 10 } })}</g>
    ),
  }));
});
import { useTheme } from '../contexts/ThemeContextUtils';

describe('LinkChart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the chart in light theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<LinkChart />);
    
    const svg = screen.getByRole('application');
    expect(svg).toBeInTheDocument();
    
    expect(svg.querySelectorAll('path')).toHaveLength(3);
  });

  it('renders the chart in dark theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<LinkChart />);
    const svg = screen.getByRole('application');
    expect(svg).toBeInTheDocument();
    expect(svg.querySelectorAll('path')).toHaveLength(3);
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

  it('inline XAxis tick function renders CustomXTick with correct theme', () => {
    const theme = 'light';
    const tickFn = (props: any) => <CustomXTick {...props} theme={theme} />;
    const { container } = render(
      <svg>
        <g>{tickFn({ x: 10, y: 20, payload: { value: 'Feb' } })}</g>
      </svg>
    );
    expect(container.querySelector('text')).toHaveAttribute('fill', 'rgba(28, 28, 28, 0.4)');
    expect(container.querySelector('text')?.textContent).toBe('Feb');
  });

  it('inline YAxis tick function renders CustomYTick with correct theme', () => {
    const theme = 'dark';
    const tickFn = (props: any) => <CustomYTick {...props} theme={theme} />;
    const { container } = render(
      <svg>
        <g>{tickFn({ x: 10, y: 20, payload: { value: 20 } })}</g>
      </svg>
    );
    expect(container.querySelector('text')).toHaveAttribute('fill', 'rgba(255, 255, 255, 0.4)');
    expect(container.querySelector('text')?.textContent).toBe('20M');
  });
}); 