import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SellingProductsTable from '../components/SellingProductsTable';
import { tableData } from '../data/TableData';

describe('SellingProductsTable', () => {
  it('renders table headers', () => {
    render(<SellingProductsTable />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('renders all rows from tableData with correct values', () => {
    const { container } = render(<SellingProductsTable />);
    const rows = container.querySelectorAll('tr');
    
    const dataRows = Array.from(rows).slice(1);
    expect(dataRows.length).toBe(tableData.length);
    dataRows.forEach((row, i) => {
      const cells = (row as HTMLElement).querySelectorAll('th');
      
      expect(cells[0].textContent).toBe(tableData[i].name);
      expect(cells[1].textContent).toBe(tableData[i].price);
      expect(cells[2].textContent).toBe(tableData[i].quantity.toString());
      expect(cells[3].textContent).toBe(tableData[i].amount);
    });
  });
}); 