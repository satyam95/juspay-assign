import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MainSidebar from '../components/MainSidebar';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../components/AccordionItem', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="accordion-item">{JSON.stringify(props)}</div>,
}));

describe('MainSidebar', () => {
  it('renders logo and all static sidebar items', () => {
    render(
      <MemoryRouter>
        <MainSidebar />
      </MemoryRouter>
    );
    expect(screen.getByAltText('logo')).toHaveAttribute('src', '/logo.png');
    expect(screen.getByText('ByeWind')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Recently')).toBeInTheDocument();
    expect(screen.getAllByText('Overview')[0]).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Dashboards')).toBeInTheDocument();
    expect(screen.getByText('Pages')).toBeInTheDocument();
  });

  it('renders all AccordionItem props and order correctly', () => {
    render(
      <MemoryRouter>
        <MainSidebar />
      </MemoryRouter>
    );
    const accordionItems = screen.getAllByTestId('accordion-item');
    expect(accordionItems.length).toBe(9);

    // Default
    const defaultAccordion = JSON.parse(accordionItems[0].textContent!);
    expect(defaultAccordion.title).toBe('Default');
    expect(defaultAccordion.iconLight).toBe('/chart.png');
    expect(defaultAccordion.iconDark).toBe('/chart-dark.png');
    expect(defaultAccordion.isActive).toBe(true);
    expect(defaultAccordion.items).toBeUndefined();
    expect(defaultAccordion.isOpenByDefault).toBeUndefined();

    // eCommerce
    const eCommerceAccordion = JSON.parse(accordionItems[1].textContent!);
    expect(eCommerceAccordion.title).toBe('eCommerce');
    expect(eCommerceAccordion.iconLight).toBe('/bag.png');
    expect(eCommerceAccordion.iconDark).toBe('/bag-dark.png');
    expect(eCommerceAccordion.items).toEqual(['Overview']);
    expect(eCommerceAccordion.isActive).toBeUndefined();
    expect(eCommerceAccordion.isOpenByDefault).toBeUndefined();

    // Projects
    const projectsAccordion = JSON.parse(accordionItems[2].textContent!);
    expect(projectsAccordion.title).toBe('Projects');
    expect(projectsAccordion.iconLight).toBe('/folder.png');
    expect(projectsAccordion.iconDark).toBe('/folder-dark.png');
    expect(projectsAccordion.items).toEqual(['Overview']);

    // Online Courses
    const coursesAccordion = JSON.parse(accordionItems[3].textContent!);
    expect(coursesAccordion.title).toBe('Online Courses');
    expect(coursesAccordion.iconLight).toBe('/book.png');
    expect(coursesAccordion.iconDark).toBe('/book-dark.png');
    expect(coursesAccordion.items).toEqual(['Overview']);

    // User Profile
    const userProfileAccordion = JSON.parse(accordionItems[4].textContent!);
    expect(userProfileAccordion.title).toBe('User Profile');
    expect(userProfileAccordion.iconLight).toBe('/profile.png');
    expect(userProfileAccordion.iconDark).toBe('/profile-dark.png');
    expect(userProfileAccordion.items).toEqual([
      'Overview',
      'Projects',
      'Campaigns',
      'Documents',
      'Followers',
    ]);
    expect(userProfileAccordion.isOpenByDefault).toBe(true);

    // Account
    const accountAccordion = JSON.parse(accordionItems[5].textContent!);
    expect(accountAccordion.title).toBe('Account');
    expect(accountAccordion.iconLight).toBe('/account.png');
    expect(accountAccordion.iconDark).toBe('/account-dark.png');
    expect(accountAccordion.items).toEqual(['Overview']);

    // Corporate
    const corporateAccordion = JSON.parse(accordionItems[6].textContent!);
    expect(corporateAccordion.title).toBe('Corporate');
    expect(corporateAccordion.iconLight).toBe('/corporate.png');
    expect(corporateAccordion.iconDark).toBe('/corporate-dark.png');
    expect(corporateAccordion.items).toEqual(['Overview']);

    // Blog
    const blogAccordion = JSON.parse(accordionItems[7].textContent!);
    expect(blogAccordion.title).toBe('Blog');
    expect(blogAccordion.iconLight).toBe('/blog.png');
    expect(blogAccordion.iconDark).toBe('/blog-dark.png');
    expect(blogAccordion.items).toEqual(['Overview']);

    // Social
    const socialAccordion = JSON.parse(accordionItems[8].textContent!);
    expect(socialAccordion.title).toBe('Social');
    expect(socialAccordion.iconLight).toBe('/social.png');
    expect(socialAccordion.iconDark).toBe('/social-dark.png');
    expect(socialAccordion.items).toEqual(['Overview']);
  });
}); 