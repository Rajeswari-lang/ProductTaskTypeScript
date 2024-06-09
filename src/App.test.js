import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from './ProductList';

const mockStore = configureStore([]);
const store = mockStore({
  products: {
    items: [
      { id: 1, name: 'Product 1', price: 10.0, description: 'Description 1' },
      { id: 2, name: 'Product 2', price: 20.0, description: 'Description 2' },
    ],
    status: 'succeeded',
    error: null,
  },
});

describe('ProductList', () => {
  test('renders product list', () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('filters products based on search term', () => {
    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search products...'), {
      target: { value: 'Product 1' },
    });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });
});
