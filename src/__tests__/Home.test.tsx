import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { ThemeContext, type ThemeContextType } from '../contexts/ThemeContextUtils';
import { describe, it, expect } from 'vitest';

const renderWithTheme = (theme: 'light' | 'dark') => {
  const value: ThemeContextType = {
    theme,
    toggleTheme: () => {},
  };
  return render(
    <ThemeContext.Provider value={value}>
      <Home />
    </ThemeContext.Provider>
  );
};

describe('Home Page', () => {
  it('renders all main sections and cards in light theme', () => {
    renderWithTheme('light');
    expect(screen.getByText('eCommerce')).toBeInTheDocument();
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getAllByText('Revenue').length).toBeGreaterThan(0);
    expect(screen.getByText('Growth')).toBeInTheDocument();
    expect(screen.getByText('Projections vs Actuals')).toBeInTheDocument();
    expect(screen.getByText('Current Week')).toBeInTheDocument();
    expect(screen.getByText('Previous Week')).toBeInTheDocument();
    expect(screen.getByAltText('map image')).toHaveAttribute('src', '/map.png');
    expect(screen.getByText('Revenue by Location')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('Sydney')).toBeInTheDocument();
    expect(screen.getByText('Singapore')).toBeInTheDocument();
    expect(screen.getByText('Top Selling Products')).toBeInTheDocument();
    expect(screen.getByText('Total Sales')).toBeInTheDocument();
    expect(screen.getByText('Direct')).toBeInTheDocument();
    expect(screen.getByText('Affilliate')).toBeInTheDocument();
    expect(screen.getByText('Sponsored')).toBeInTheDocument();
    expect(screen.getByText('E-mail')).toBeInTheDocument();
  });

  it('renders map image in dark theme', () => {
    renderWithTheme('dark');
    expect(screen.getByAltText('map image')).toHaveAttribute('src', '/map-dark.png');
  });
}); 