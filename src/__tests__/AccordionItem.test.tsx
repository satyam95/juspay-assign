import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AccordionItem from '../components/AccordionItem';

vi.mock('../contexts/ThemeContextUtils', () => ({
  useTheme: vi.fn(),
}));

import { useTheme } from '../contexts/ThemeContextUtils';

describe('AccordionItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props (light theme)', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<AccordionItem title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByAltText('chart icon')).toHaveAttribute('src', '/chart.png');
  });

  it('renders with dark theme and custom icons', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(
      <AccordionItem
        title="Dark Title"
        iconLight="/custom-light.png"
        iconDark="/custom-dark.png"
      />
    );
    expect(screen.getByAltText('chart icon')).toHaveAttribute('src', '/custom-dark.png');
  });

  it('renders as active without items', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<AccordionItem title="Active" isActive />);

    const title = screen.getByText('Active');
    const clickableRow = title.closest('.flex') || title.parentElement?.parentElement;
    
    const bgContainer = clickableRow?.parentElement;
    expect(bgContainer?.className).toMatch(/bg-\[rgba\(28,28,28,0.05\)\]/);
    expect(bgContainer?.className).toMatch(/rounded-lg/);
  });

  it('renders with items, closed by default, and toggles open on click (light)', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(
      <AccordionItem
        title="With Items"
        items={["Item 1", "Item 2"]}
      />
    );
    
    const title = screen.getByText('With Items');
    const clickableRow = title.closest('.flex') || title.parentElement?.parentElement;
    const wrapper = clickableRow?.parentElement?.parentElement?.querySelector('div.transition-all');
    expect(wrapper?.className).toContain('max-h-0');
    
    fireEvent.click(title);
    expect(wrapper?.className).toContain('max-h-[500px]');
    
    expect(screen.getByAltText('toggle icon')).toHaveAttribute('src', '/open.png');
  });

  it('renders with items, open by default, and toggles closed on click (dark)', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'dark' });
    render(
      <AccordionItem
        title="With Items"
        items={["Item 1", "Item 2"]}
        isOpenByDefault
      />
    );
    const title = screen.getByText('With Items');
    const clickableRow = title.closest('.flex') || title.parentElement?.parentElement;
    const wrapper = clickableRow?.parentElement?.parentElement?.querySelector('div.transition-all');
    expect(wrapper?.className).toContain('max-h-[500px]');
    
    expect(screen.getByAltText('toggle icon')).toHaveAttribute('src', '/open-dark.png');
    
    fireEvent.click(title);
    expect(wrapper?.className).toContain('max-h-0');
    
    expect(screen.getByAltText('toggle icon')).toHaveAttribute('src', '/close-dark.png');
  });

  it('does not toggle if no items', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    render(<AccordionItem title="No Items" />);
    fireEvent.click(screen.getByText('No Items'));
    
    expect(screen.queryByAltText('toggle icon')).not.toBeInTheDocument();
  });

  it('updates open state when isOpenByDefault changes', () => {
    (useTheme as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ theme: 'light' });
    const { rerender } = render(
      <AccordionItem title="Dynamic" items={["A"]} isOpenByDefault={false} />
    );
    const title = screen.getByText('Dynamic');
    const clickableRow = title.closest('.flex') || title.parentElement?.parentElement;
    const wrapper = clickableRow?.parentElement?.parentElement?.querySelector('div.transition-all');
    expect(wrapper?.className).toContain('max-h-0');
    rerender(<AccordionItem title="Dynamic" items={["A"]} isOpenByDefault={true} />);
    expect(wrapper?.className).toContain('max-h-[500px]');
  });
}); 