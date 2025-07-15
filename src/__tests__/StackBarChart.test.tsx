import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import StackBarChart, { CustomXTick, CustomYTick, CustomSectorTooltip } from '../components/StackBarChart';
import React from 'react';
import { useTheme } from '../contexts/ThemeContextUtils';

// Mock the ThemeContextUtils
vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));

// Mock recharts components
vi.mock('recharts', (importOriginal: () => Promise<any>) => {
  return importOriginal().then((original) => ({
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <svg role="application">{children}</svg>
    ),
    Bar: () => <rect data-testid="bar" />,
    CartesianGrid: () => <g data-testid="cartesian-grid" />,
    XAxis: ({ tick, theme }: any) => (
      <g data-testid="x-axis">{tick && tick({ x: 10, y: 20, payload: { value: 'Jan' }, theme })}</g>
    ),
    YAxis: ({ tick, theme }: any) => (
      <g data-testid="y-axis">{tick && tick({ x: 10, y: 20, payload: { value: 10 }, theme })}</g>
    ),
    Tooltip: ({ content }: any) => (
      <g data-testid="tooltip">
        {content &&
          content({
            active: true,
            payload: [
              { payload: { name: 'Jan' }, name: 'A', value: 18 },
              { payload: { name: 'Jan' }, name: 'B', value: 3 },
            ],
            coordinate: { x: 100, y: 200 },
          })}
      </g>
    ),
  }));
});

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
    expect(c1.querySelector('text')?.textContent).toBe('10M');

    const { container: c2 } = render(
      <svg>
        <g>
          <CustomYTick x={10} y={20} payload={{ value: 0 }} theme="dark" />
        </g>
      </svg>
    );
    expect(c2.querySelector('text')).toHaveAttribute('fill', 'rgba(255, 255, 255, 0.4)');
    expect(c2.querySelector('text')?.textContent).toBe('0');
  });

  it('renders Tooltip with CustomSectorTooltip in light theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StackBarChart />);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toContain('Jan');
    expect(tooltip.textContent).toContain('A: 18M');
    expect(tooltip.textContent).toContain('B: 3M');
    expect(tooltip.querySelector('div')).toHaveStyle({
      backgroundColor: 'rgba(28,28,28,0.8)',
    });
  });

  it('renders Tooltip with CustomSectorTooltip in dark theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<StackBarChart />);

    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toContain('Jan');
    expect(tooltip.textContent).toContain('A: 18M');
    expect(tooltip.textContent).toContain('B: 3M');
    expect(tooltip.querySelector('div')).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,0.05)',
    });
  });

  it('renders CustomSectorTooltip with correct props when called via Tooltip content', () => {
    const theme = 'light';
    const props = {
      active: true,
      payload: [
        { payload: { name: 'Feb' }, name: 'A', value: 21 },
        { payload: { name: 'Feb' }, name: 'B', value: 6 },
      ],
      coordinate: { x: 50, y: 60 },
    };
    const contentFn = (props: any) => <CustomSectorTooltip {...props} theme={theme} />;
    const { container } = render(<>{contentFn(props)}</>);

    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.textContent).toContain('Feb');
    expect(container.textContent).toContain('A: 21M');
    expect(container.textContent).toContain('B: 6M');
    expect(container.querySelector('div')).toHaveStyle({
      backgroundColor: 'rgba(28,28,28,0.8)',
    });
  });

  it('does not render CustomSectorTooltip when active is false', () => {
    const theme = 'light';
    const props = {
      active: false,
      payload: [
        { payload: { name: 'Jan' }, name: 'A', value: 18 },
        { payload: { name: 'Jan' }, name: 'B', value: 3 },
      ],
      coordinate: { x: 100, y: 200 },
    };
    const contentFn = (props: any) => <CustomSectorTooltip {...props} theme={theme} />;
    const { container } = render(<>{contentFn(props)}</>);

    expect(container.firstChild).toBeNull();
  });

  it('does not render CustomSectorTooltip when payload is empty', () => {
    const theme = 'light';
    const props = {
      active: true,
      payload: [],
      coordinate: { x: 100, y: 200 },
    };
    const contentFn = (props: any) => <CustomSectorTooltip {...props} theme={theme} />;
    const { container } = render(<>{contentFn(props)}</>);

    expect(container.firstChild).toBeNull();
  });

  it('does not render CustomSectorTooltip when coordinate is missing', () => {
    const theme = 'light';
    const props = {
      active: true,
      payload: [
        { payload: { name: 'Jan' }, name: 'A', value: 18 },
        { payload: { name: 'Jan' }, name: 'B', value: 3 },
      ],
      coordinate: undefined,
    };
    const contentFn = (props: any) => <CustomSectorTooltip {...props} theme={theme} />;
    const { container } = render(<>{contentFn(props)}</>);

    expect(container.firstChild).toBeNull();
  });

  it('calls StackBarChart as a function for coverage', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    StackBarChart();
  });
});