import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NotificationSidebar from '../components/NotificationSidebar';

vi.mock('../components/ActivityCard', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="activity-card">{JSON.stringify(props)}</div>,
}));
vi.mock('../components/ContactCard', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="contact-card">{JSON.stringify(props)}</div>,
}));
vi.mock('../components/NotificationCard', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="notification-card">{JSON.stringify(props)}</div>,
}));

describe('NotificationSidebar', () => {
  it('renders all section headers', () => {
    render(<NotificationSidebar />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Activities')).toBeInTheDocument();
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });

  it('renders all NotificationCard props correctly', () => {
    render(<NotificationSidebar />);
    const notificationCards = screen.getAllByTestId('notification-card');
    expect(notificationCards.length).toBe(4);
    const first = JSON.parse(notificationCards[0].textContent!);
    expect(first.type).toBe('bug');
    expect(first.icon).toBe('/bug.png');
    expect(first.title).toBe('You have a bug that needs to be fixed.');
    const last = JSON.parse(notificationCards[3].textContent!);
    expect(last.type).toBe('update');
    expect(last.icon).toBe('/broadcast.png');
    expect(last.title).toBe('Andi Lane subscribed to you');
  });

  it('renders all ActivityCard props correctly', () => {
    render(<NotificationSidebar />);
    const activityCards = screen.getAllByTestId('activity-card');
    expect(activityCards.length).toBe(5);
    const first = JSON.parse(activityCards[0].textContent!);
    expect(first.icon).toBe('/act1.png');
    expect(first.title).toBe('You have a bug that needs to be fixed.');
    const last = JSON.parse(activityCards[4].textContent!);
    expect(last.icon).toBe('/act5.png');
    expect(last.title).toBe('Deleted a page in Project X');
    expect(last.isLast).toBe(true);
  });

  it('renders all ContactCard props correctly', () => {
    render(<NotificationSidebar />);
    const contactCards = screen.getAllByTestId('contact-card');
    expect(contactCards.length).toBe(6);
    const first = JSON.parse(contactCards[0].textContent!);
    expect(first.picture).toBe('/user1.png');
    expect(first.name).toBe('Natali Craig');
    const last = JSON.parse(contactCards[5].textContent!);
    expect(last.picture).toBe('/user6.png');
    expect(last.name).toBe('Koray Okumus');
  });
}); 