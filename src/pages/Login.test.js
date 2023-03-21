import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

import { MemoryRouter } from 'react-router-dom';

describe('Login component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('renders email and password inputs', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Email :')).toBeInTheDocument();
    expect(screen.getByLabelText('Password :')).toBeInTheDocument();
  });

  test('shows error message if email and password are not entered', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByTestId('error_message')).toHaveTextContent('Please enter your email and password.');
  });

  test('shows error message if an invalid email is entered', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Email :'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByLabelText('Password :'), { target: { value: 'validpassword1#' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByTestId('error_message')).toHaveTextContent('Please enter a valid email id');
  });

  test('shows error message if password is too short', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Email :'), { target: { value: 'validemail@test.com' } });
    fireEvent.change(screen.getByLabelText('Password :'), { target: { value: 'short1#' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByTestId('error_message')).toHaveTextContent('The password should be atleast 8 character long and should have atleast one uppercase,lowercase,special character and a number value in it.');
  });

  test('shows error message if password is missing a character type', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Email :'), { target: { value: 'validemail@test.com' } });
    fireEvent.change(screen.getByLabelText('Password :'), { target: { value: 'incomplete1' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByTestId('error_message')).toHaveTextContent('The password should be atleast 8 character long and should have atleast one uppercase,lowercase,special character and a number value in it.');
  });

  test('shows error message if email and password do not match', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText('Email :'), { target: { value: 'validemail@test.com' } });
    fireEvent.change(screen.getByLabelText('Password :'), { target: { value: 'Invalidpassword1#' } });
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByTestId('error_message')).toHaveTextContent('incorrect email or password.');
  });

  

})



