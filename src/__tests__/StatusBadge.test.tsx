import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import StatusBadge from '../components/StatusBadge';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));
import { useTheme } from '../contexts/ThemeContextUtils';

describe('StatusBadge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const statuses = [
    { status: 'In Progress', dot: 'bg-[rgba(149,164,252,1)]', text: 'text-[rgba(138,140,217,1)]' },
    { status: 'Complete', dot: 'bg-[rgba(161,227,203,1)]', text: 'text-[rgba(74,167,133,1)]' },
    { status: 'Pending', dot: 'bg-[rgba(177,227,255,1)]', text: 'text-[rgba(89,168,212,1)]' },
    { status: 'Approved', dot: 'bg-[rgba(255,233,153,1)]', text: 'text-[rgba(255,197,85,1)]' },
  ];

  statuses.forEach(({ status, dot, text }) => {
    it(`renders correctly for status='${status}'`, () => {
      (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
      render(<StatusBadge status={status} />);
      const badge = screen.getByText(status);
      expect(badge).toHaveClass(text);
      const dotDiv = badge.parentElement?.querySelector('div.rounded-full');
      expect(dotDiv).toHaveClass(dot);
    });
  });

  it("renders correctly for status='Rejected' in light theme", () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StatusBadge status="Rejected" />);
    const badge = screen.getByText('Rejected');
    expect(badge).toHaveClass('text-[rgba(28,28,28,0.4)]');
    const dotDiv = badge.parentElement?.querySelector('div.rounded-full');
    expect(dotDiv).toHaveClass('bg-[rgba(28,28,28,0.4)]');
  });

  it("renders correctly for status='Rejected' in dark theme", () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<StatusBadge status="Rejected" />);
    const badge = screen.getByText('Rejected');
    expect(badge).toHaveClass('text-[rgba(255,255,255,0.2)]');
    const dotDiv = badge.parentElement?.querySelector('div.rounded-full');
    expect(dotDiv).toHaveClass('bg-[rgba(255,255,255,0.4)]');
  });

  it('renders correctly for unknown status (default case)', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<StatusBadge status="Unknown" />);
    const badge = screen.getByText('Unknown');
    expect(badge).toHaveClass('text-gray-400');
    const dotDiv = badge.parentElement?.querySelector('div.rounded-full');
    expect(dotDiv).toHaveClass('bg-gray-300');
  });
});
