import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActivityCard from '../components/ActivityCard';

describe('ActivityCard', () => {
  const baseProps = {
    icon: '/test-icon.png',
    alt: 'Test Icon',
    title: 'Test Activity',
    time: '2 hours ago',
  };

  it('renders all props correctly', () => {
    render(<ActivityCard {...baseProps} />);
    expect(screen.getByAltText('Test Icon')).toHaveAttribute('src', '/test-icon.png');
    expect(screen.getByText('Test Activity')).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
  });

  it('renders the vertical line when isLast is false (default)', () => {
    render(<ActivityCard {...baseProps} />);
    
    const line = screen.getByText('Test Activity').closest('.relative')?.querySelector('div.absolute');
    expect(line).toBeInTheDocument();
  });

  it('does not render the vertical line when isLast is true', () => {
    render(<ActivityCard {...baseProps} isLast />);
    
    const line = screen.getByText('Test Activity').closest('.relative')?.querySelector('div.absolute');
    expect(line).not.toBeInTheDocument();
  });
}); 