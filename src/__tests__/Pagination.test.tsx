import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Pagination from '../components/Pagination';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));
import { useTheme } from '../contexts/ThemeContextUtils';

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all page numbers and icons in light theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<Pagination />);
    expect(screen.getByAltText('prev icon')).toHaveAttribute('src', '/prev.png');
    expect(screen.getByAltText('next icon')).toHaveAttribute('src', '/next.png');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByText('5').length).toBe(2);
  });

  it('renders all page numbers and icons in dark theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(<Pagination />);
    expect(screen.getByAltText('prev icon')).toHaveAttribute('src', '/prev-dark.png');
    expect(screen.getByAltText('next icon')).toHaveAttribute('src', '/next-dark.png');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getAllByText('5').length).toBe(2);
  });
}); 