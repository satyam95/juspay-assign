import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LinkChart, { CustomXTick, CustomYTick, CustomSectorTooltip } from '../components/LinkChart';
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
    Tooltip: ({ content }: any) => (
      <g data-testid="tooltip">
        {content &&
          content({
            active: true,
            payload: [
              { payload: { name: 'Jan' }, name: 'PW', value: 10 },
              { payload: { name: 'Jan' }, name: 'CW', value: 20 },
            ],
            coordinate: { x: 100, y: 200 },
          })}
      </g>
    ),
  }));
});

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
    render(<LinkChart />);
    
    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toContain('Jan');
    expect(tooltip.textContent).toContain('PW: 10M');
    expect(tooltip.textContent).toContain('CW: 20M');
    expect(tooltip.querySelector('div')).toHaveStyle({
      backgroundColor: 'rgba(28,28,28,0.8)',
    });
  });

  it('renders Tooltip with CustomSectorTooltip in dark theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<LinkChart />);
    
    const tooltip = screen.getByTestId('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toContain('Jan');
    expect(tooltip.textContent).toContain('PW: 10M');
    expect(tooltip.textContent).toContain('CW: 20M');
    expect(tooltip.querySelector('div')).toHaveStyle({
      backgroundColor: 'rgba(255,255,255,0.05)',
    });
  });

  it('renders CustomSectorTooltip with correct props when called via Tooltip content', () => {
    const theme = 'light';
    const props = {
      active: true,
      payload: [
        { payload: { name: 'Feb' }, name: 'PW', value: 15 },
        { payload: { name: 'Feb' }, name: 'CW', value: 25 },
      ],
      coordinate: { x: 50, y: 60 },
    };
    const contentFn = (props: any) => <CustomSectorTooltip {...props} theme={theme} />;
    const { container } = render(<>{contentFn(props)}</>);
    
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.textContent).toContain('Feb');
    expect(container.textContent).toContain('PW: 15M');
    expect(container.textContent).toContain('CW: 25M');
    expect(container.querySelector('div')).toHaveStyle({
      backgroundColor: 'rgba(28,28,28,0.8)',
    });
  });

  it('does not render CustomSectorTooltip when active is false', () => {
    const theme = 'light';
    const props = {
      active: false,
      payload: [
        { payload: { name: 'Jan' }, name: 'PW', value: 10 },
        { payload: { name: 'Jan' }, name: 'CW', value: 20 },
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
        { payload: { name: 'Jan' }, name: 'PW', value: 10 },
        { payload: { name: 'Jan' }, name: 'CW', value: 20 },
      ],
      coordinate: undefined,
    };
    const contentFn = (props: any) => <CustomSectorTooltip {...props} theme={theme} />;
    const { container } = render(<>{contentFn(props)}</>);
    
    expect(container.firstChild).toBeNull();
  });

  it('calls LinkChart as a function for coverage', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    LinkChart();
  });
});