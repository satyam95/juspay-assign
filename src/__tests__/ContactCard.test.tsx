import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactCard from '../components/ContactCard';

describe('ContactCard', () => {
  it('renders the picture and name correctly', () => {
    render(<ContactCard picture="/test-pic.png" name="John Doe" />);
    const img = screen.getByAltText('John Doe profile picture');
    expect(img).toHaveAttribute('src', '/test-pic.png');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
}); 