import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Header from '../components/Header';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));
vi.mock('../contexts/SidebarContextUtils', () => ({
  useSidebar: vi.fn(),
}));
import { useTheme } from '../contexts/ThemeContextUtils';
import { useSidebar } from '../contexts/SidebarContextUtils';

describe('Header', () => {
  let toggleTheme: ReturnType<typeof vi.fn>;
  let toggleMainSidebar: ReturnType<typeof vi.fn>;
  let toggleNotificationSidebar: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    toggleTheme = vi.fn();
    toggleMainSidebar = vi.fn();
    toggleNotificationSidebar = vi.fn();
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light', toggleTheme });
    (useSidebar as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ toggleMainSidebar, toggleNotificationSidebar });
  });

  it('renders all icons and elements in light theme', () => {
    render(<Header />);
    expect(screen.getByAltText('hamburger icon for main sidebar')).toHaveAttribute('src', '/menu.png');
    expect(screen.getByAltText('star icon')).toHaveAttribute('src', '/star.png');
    expect(screen.getByAltText('search icon')).toHaveAttribute('src', '/search.png');
    expect(screen.getByAltText('ctrl icon')).toHaveAttribute('src', '/ctrl.png');
    expect(screen.getByAltText('light mode icon')).toHaveAttribute('src', '/sun.png');
    const sidebarIcons = screen.getAllByAltText('sidebar hamburger icon');
    expect(sidebarIcons[0]).toHaveAttribute('src', '/clock.png');
    expect(sidebarIcons[1]).toHaveAttribute('src', '/bell.png');
    expect(screen.getByAltText('hamburger icon for notification sidebar')).toHaveAttribute('src', '/menu.png');
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Dashboards')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('renders all icons and elements in dark theme', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark', toggleTheme });
    render(<Header />);
    expect(screen.getByAltText('hamburger icon for main sidebar')).toHaveAttribute('src', '/menu-dark.png');
    expect(screen.getByAltText('star icon')).toHaveAttribute('src', '/star-dark.png');
    expect(screen.getByAltText('search icon')).toHaveAttribute('src', '/search-dark.png');
    expect(screen.getByText('⌘/')).toBeInTheDocument();
    expect(screen.getByAltText('light mode icon')).toHaveAttribute('src', '/moon.png');
    const sidebarIcons = screen.getAllByAltText('sidebar hamburger icon');
    expect(sidebarIcons[0]).toHaveAttribute('src', '/clock-dark.png');
    expect(sidebarIcons[1]).toHaveAttribute('src', '/bell-dark.png');
    expect(screen.getByAltText('hamburger icon for notification sidebar')).toHaveAttribute('src', '/menu-dark.png');
  });

  it('calls toggleMainSidebar when main sidebar button is clicked', () => {
    render(<Header />);
    const btn = screen.getByAltText('hamburger icon for main sidebar').closest('button');
    fireEvent.click(btn!);
    expect(toggleMainSidebar).toHaveBeenCalled();
  });

  it('calls toggleNotificationSidebar when notification sidebar button is clicked', () => {
    render(<Header />);
    const btn = screen.getByAltText('hamburger icon for notification sidebar').closest('button');
    fireEvent.click(btn!);
    expect(toggleNotificationSidebar).toHaveBeenCalled();
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(<Header />);
    const btn = screen.getByAltText('light mode icon').closest('button');
    fireEvent.click(btn!);
    expect(toggleTheme).toHaveBeenCalled();
  });
}); 