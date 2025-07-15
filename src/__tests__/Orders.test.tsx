import { render, screen } from '@testing-library/react';
import Orders from '../pages/Orders';
import { ThemeContext, type ThemeContextType } from '../contexts/ThemeContextUtils';
import { OrdersData } from '../data/OrdersData';
import { describe, it, expect } from 'vitest';

const renderWithTheme = (theme: 'light' | 'dark') => {
  const value: ThemeContextType = {
    theme,
    toggleTheme: () => {},
  };
  return render(
    <ThemeContext.Provider value={value}>
      <Orders />
    </ThemeContext.Provider>
  );
};

describe('Orders Page', () => {
  it('renders all main sections and table in light theme', () => {
    renderWithTheme('light');
    expect(screen.getByText('Order List')).toBeInTheDocument();
    
    expect(screen.getByText('Order ID')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Project')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    
    expect(screen.getAllByAltText('plus icon')[0]).toHaveAttribute('src', '/plus.png');
    expect(screen.getAllByAltText('filter icon')[0]).toHaveAttribute('src', '/filter.png');
    expect(screen.getAllByAltText('sort icon')[0]).toHaveAttribute('src', '/sort.png');
    expect(screen.getAllByAltText('search icon')[0]).toHaveAttribute('src', '/searchFilter.png');
    
    OrdersData.forEach((item) => {
      expect(screen.getAllByText(item.orderId).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.user.name).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.project).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.address).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.date).length).toBeGreaterThan(0);
      expect(screen.getAllByText(item.status).length).toBeGreaterThan(0);
    });
  });

  it('renders dark theme icons and calendar', () => {
    renderWithTheme('dark');
    expect(screen.getAllByAltText('plus icon')[0]).toHaveAttribute('src', '/plus-dark.png');
    expect(screen.getAllByAltText('filter icon')[0]).toHaveAttribute('src', '/filter-dark.png');
    expect(screen.getAllByAltText('sort icon')[0]).toHaveAttribute('src', '/sort-dark.png');
    expect(screen.getAllByAltText('search icon')[0]).toHaveAttribute('src', '/searchFilter-dark.png');
    
    expect(screen.getAllByAltText('calendar icon')[0]).toHaveAttribute('src', '/date-dark.png');
  });
}); 