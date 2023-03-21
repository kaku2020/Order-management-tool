import { render, screen, fireEvent } from '@testing-library/react';
import Orders from './Orders';
import Ordersdata from '../data/OrdersData.js';

describe('Orders component', () => {
  beforeEach(() => {
    // Mock sessionStorage
    sessionStorage.setItem('userid', '1');
  });

  afterEach(() => {
    // Clear sessionStorage
    sessionStorage.clear();
  });

  it('renders without crashing', () => {
    render(<Orders />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('sets the current user when the component mounts', () => {
    render(<Orders />);
    expect(screen.getByText('john.smith123@gmail.com')).toBeInTheDocument();
  });

  it('updates the search state when the input value changes', () => {
    render(<Orders />);
    const searchInput = screen.getByTestId('orders__search');
    fireEvent.change(searchInput, { target: { value: 'Shipped' } });
    expect(searchInput).toHaveValue('Shipped');
  });

  it('updates the page state when a new page is selected', () => {
    render(<Orders />);
    const page2Button = screen.getByTestId(2);
    fireEvent.click(page2Button);
    expect(screen.getByTestId(2, { selected: true })).toBeInTheDocument();
  });

  it('filters the orders based on the search query', () => {
    render(<Orders />);
    const searchInput = screen.getByTestId('orders__search');
    fireEvent.change(searchInput, { target: { value: 'Shipped' } });
    const filteredRows = screen.getAllByRole('row').filter((row) => row.textContent.includes('Shipped'));
    expect(filteredRows.length).toBe(8);
  });

  it('renders the correct number of rows per page', () => {
    render(<Orders />);
    const rows = screen.getAllByRole('row').filter((row) => !row.classList.contains('orders__table-header'));
    expect(rows.length).toBe(11);
  });

  it('displays the correct user id in the header', () => {
    render(<Orders />);
    expect(screen.getByText('User Id : 1')).toBeInTheDocument();
  });

  it('displays the correct middle heading Orders Page in the header', () => {
    render(<Orders />);
    expect(screen.getByText('Orders Page')).toBeInTheDocument();
  });

  it('displays the correct email in the header', () => {
    render(<Orders />);
    expect(screen.getByText('john.smith123@gmail.com')).toBeInTheDocument();
  });
});
