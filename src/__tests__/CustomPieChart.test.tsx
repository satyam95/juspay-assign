import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomPieChart, { CustomSectorTooltip } from '../components/CustomPieChart';
import React from 'react';

vi.mock('recharts', (importOriginal: () => Promise<any>) => {
  return importOriginal().then((original) => ({
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }));
});

describe('CustomPieChart', () => {
  it('renders the pie chart and all cells', () => {
    render(<CustomPieChart />);
    
    const svg = screen.getByRole('application');
    expect(svg).toBeInTheDocument();
  });

  it('renders the custom tooltip when active and payload are provided', () => {
    const { container } = render(
      <CustomSectorTooltip
        active={true}
        payload={[{ name: 'Test', value: 123 }]}
        coordinate={{ x: 10, y: 20 }}
      />
    );
    expect(container.textContent).toContain('Test');
  });

  it('returns null for tooltip when not active or no payload', () => {
    const { container } = render(<CustomSectorTooltip active={false} />);
    expect(container.firstChild).toBeNull();
    const { container: c2 } = render(<CustomSectorTooltip active={true} payload={[]} />);
    expect(c2.firstChild).toBeNull();
    const { container: c3 } = render(<CustomSectorTooltip active={true} />);
    expect(c3.firstChild).toBeNull();
  });
}); 