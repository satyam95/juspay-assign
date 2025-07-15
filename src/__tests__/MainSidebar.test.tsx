import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MainSidebar from '../components/MainSidebar';

vi.mock('../components/AccordionItem', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="accordion-item">{JSON.stringify(props)}</div>,
}));

describe('MainSidebar', () => {
  it('renders logo and all static sidebar items', () => {
    render(<MainSidebar />);
    expect(screen.getByAltText('logo')).toHaveAttribute('src', '/logo.png');
    expect(screen.getByText('ByeWind')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Recently')).toBeInTheDocument();
    expect(screen.getAllByText('Overview')[0]).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Dashboards')).toBeInTheDocument();
    expect(screen.getByText('Pages')).toBeInTheDocument();
  });

  it('renders all AccordionItem props correctly', () => {
    render(<MainSidebar />);
    const accordionItems = screen.getAllByTestId('accordion-item');
    
    expect(accordionItems.length).toBe(9);
    
    const first = JSON.parse(accordionItems[0].textContent!);
    expect(first.title).toBe('Default');
    expect(first.iconLight).toBe('/chart.png');
    expect(first.isActive).toBe(true);
    const last = JSON.parse(accordionItems[accordionItems.length - 1].textContent!);
    expect(last.title).toBe('Social');
    expect(last.iconDark).toBe('/social-dark.png');
    expect(last.items).toEqual(['Overview']);
  });
}); 