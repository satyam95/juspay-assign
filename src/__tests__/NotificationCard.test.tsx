import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotificationCard from '../components/NotificationCard';

describe('NotificationCard', () => {
  const baseProps = {
    type: 'info',
    icon: '/test-icon.png',
    iconAlt: 'Test Icon',
    title: 'Test Notification',
    time: 'Just now',
  };

  it('renders all props correctly for non-bug type', () => {
    render(<NotificationCard {...baseProps} />);
    expect(screen.getByAltText('Test Icon')).toHaveAttribute('src', '/test-icon.png');
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('Just now')).toBeInTheDocument();
    
    const iconBg = screen.getByAltText('Test Icon').parentElement;
    expect(iconBg?.className).toContain('bg-[rgba(229,236,246,1)]');
  });

  it('renders bug type with correct background', () => {
    render(<NotificationCard {...baseProps} type="bug" />);
    const iconBg = screen.getByAltText('Test Icon').parentElement;
    expect(iconBg?.className).toContain('bg-[rgba(227,245,255,1)]');
  });
}); 