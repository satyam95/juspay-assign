import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Layout from '../components/Layout';

vi.mock('../contexts/SidebarContextUtils', () => ({
  useSidebar: vi.fn(),
}));
vi.mock('../components/MainSidebar', () => ({
  default: () => <div data-testid="main-sidebar">MainSidebar</div>,
}));
vi.mock('../components/NotificationSidebar', () => ({
  default: () => <div data-testid="notification-sidebar">NotificationSidebar</div>,
}));
vi.mock('../components/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));
vi.mock('react-router', () => ({
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));
import { useSidebar } from '../contexts/SidebarContextUtils';

describe('Layout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithSidebar = (mainOpen: boolean, notifOpen: boolean) => {
    (useSidebar as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isMainSidebarOpen: mainOpen,
      isNotificationSidebarOpen: notifOpen,
    });
    return render(<Layout />);
  };

  it('renders with both sidebars closed', () => {
    renderWithSidebar(false, false);
    expect(screen.getByTestId('main-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('notification-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    
    const containers = screen.getAllByText(/MainSidebar|NotificationSidebar/).map(el => el.parentElement?.parentElement);
    expect(containers[0]?.className).toContain('w-0');
    expect(containers[1]?.className).toContain('w-0');
  });

  it('renders with main sidebar open, notification sidebar closed', () => {
    renderWithSidebar(true, false);
    const containers = screen.getAllByText(/MainSidebar|NotificationSidebar/).map(el => el.parentElement?.parentElement);
    expect(containers[0]?.className).toContain('w-53');
    expect(containers[1]?.className).toContain('w-0');
  });

  it('renders with main sidebar closed, notification sidebar open', () => {
    renderWithSidebar(false, true);
    const containers = screen.getAllByText(/MainSidebar|NotificationSidebar/).map(el => el.parentElement?.parentElement);
    expect(containers[0]?.className).toContain('w-0');
    expect(containers[1]?.className).toContain('w-70');
  });

  it('renders with both sidebars open', () => {
    renderWithSidebar(true, true);
    const containers = screen.getAllByText(/MainSidebar|NotificationSidebar/).map(el => el.parentElement?.parentElement);
    expect(containers[0]?.className).toContain('w-53');
    expect(containers[1]?.className).toContain('w-70');
  });
}); 