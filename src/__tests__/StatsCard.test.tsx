import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import StatsCard from '../components/StatsCard';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));
import { useTheme } from '../contexts/ThemeContextUtils';

describe('StatsCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const baseProps = {
    name: 'Revenue',
    number: '$123',
    growth: '+5%',
  };

  it('renders with color=blue, light theme, growthType=up', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StatsCard color="blue" growthType="up" {...baseProps} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$123')).toBeInTheDocument();
    expect(screen.getByText('+5%')).toBeInTheDocument();
    const card = screen.getByText('Revenue').closest('div.rounded-2xl');
    expect(card).toHaveStyle({ backgroundColor: 'rgba(227,245,255,1)' });
    const img = screen.getByAltText('up icon');
    expect(img).toHaveAttribute('src', '/up.png');
  });

  it('renders with color=blue, light theme, growthType=down', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StatsCard color="blue" growthType="down" {...baseProps} />);
    const img = screen.getByAltText('down icon');
    expect(img).toHaveAttribute('src', '/down.png');
  });

  it('renders with color=blue, dark theme, growthType=up', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<StatsCard color="blue" growthType="up" {...baseProps} />);
    const card = screen.getByText('Revenue').closest('div.rounded-2xl');
    expect(card).toHaveStyle({ backgroundColor: 'rgba(227,245,255,1)' });
    const img = screen.getByAltText('up icon');
    expect(img).toHaveAttribute('src', '/up.png');
    
    expect(screen.getByText('Revenue')).toHaveStyle({ color: 'rgba(28, 28, 28, 1)' });
  });

  it('renders with color=light, light theme, growthType=up', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StatsCard color="light" growthType="up" {...baseProps} />);
    const card = screen.getByText('Revenue').closest('div.rounded-2xl');
    expect(card).toHaveStyle({ backgroundColor: 'rgba(247,249,251,1)' });
    const img = screen.getByAltText('up icon');
    expect(img).toHaveAttribute('src', '/up.png');
    
    expect(screen.getByText('Revenue')).toHaveStyle({ color: 'rgba(28, 28, 28, 1)' });
  });

  it('renders with color=light, dark theme, growthType=down', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<StatsCard color="light" growthType="down" {...baseProps} />);
    const card = screen.getByText('Revenue').closest('div.rounded-2xl');
    expect(card).toHaveStyle({ backgroundColor: 'rgba(255, 255, 255, 0.05)' });
    const img = screen.getByAltText('down icon');
    expect(img).toHaveAttribute('src', '/down-dark.png');
    
    expect(screen.getByText('Revenue')).toHaveStyle({ color: 'rgba(255, 255, 255, 1)' });
  });

  it('renders with color=purple, light theme, growthType=up', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StatsCard color="purple" growthType="up" {...baseProps} />);
    const card = screen.getByText('Revenue').closest('div.rounded-2xl');
    expect(card).toHaveStyle({ backgroundColor: 'rgba(229,236,246,1)' });
    const img = screen.getByAltText('up icon');
    expect(img).toHaveAttribute('src', '/up.png');
    
    expect(screen.getByText('Revenue')).toHaveStyle({ color: 'rgba(28, 28, 28, 1)' });
  });

  it('renders with color=purple, dark theme, growthType=down', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<StatsCard color="purple" growthType="down" {...baseProps} />);
    const card = screen.getByText('Revenue').closest('div.rounded-2xl');
    expect(card).toHaveStyle({ backgroundColor: 'rgba(229,236,246,1)' });
    const img = screen.getByAltText('down icon');
    expect(img).toHaveAttribute('src', '/down-dark.png');
    
    expect(screen.getByText('Revenue')).toHaveStyle({ color: 'rgba(28, 28, 28, 1)' });
  });
}); 