import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Checkbox from '../components/Checkbox';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));
import { useTheme } from '../contexts/ThemeContextUtils';

describe('Checkbox', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders unchecked by default (uncontrolled)', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<Checkbox />);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
  });

  it('toggles checked state in uncontrolled mode', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<Checkbox />);
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(input).toBeChecked();
    fireEvent.click(input);
    expect(input).not.toBeChecked();
  });

  it('calls onChange with correct value in uncontrolled mode', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} />);
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true);
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('respects controlled checked prop', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    const onChange = vi.fn();
    const { rerender } = render(<Checkbox checked={false} onChange={onChange} />);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
    rerender(<Checkbox checked={true} onChange={onChange} />);
    expect(input).toBeChecked();
  });

  it('calls onChange with correct value in controlled mode', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    const onChange = vi.fn();
    render(<Checkbox checked={false} onChange={onChange} />);
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders checkmark with correct stroke color for light theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    const { container } = render(<Checkbox checked />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', 'rgba(255,255,255,1)');
  });

  it('renders checkmark with correct stroke color for dark theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    const { container } = render(<Checkbox checked />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', 'rgba(28,28,28,1)');
  });
}); 