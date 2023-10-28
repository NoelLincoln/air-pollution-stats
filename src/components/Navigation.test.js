import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';

test('renders Navigation component', () => {
  render(
    <Router>
      <Navigation />
    </Router>,
  );

  const navigationComponent = screen.getByText('Air Pollution Stats');
  expect(navigationComponent).toBeInTheDocument();
});

test('does not render "Go Back" button on the homepage', () => {
  const location = { pathname: '/' };

  render(
    <Router location={location}>
      <Navigation />
    </Router>,
  );

  const goBackButton = screen.queryByAltText('Go Back');
  expect(goBackButton).toBeNull();
});

test('renders correctly on the homepage', () => {
  const location = { pathname: '/' };

  render(
    <Router location={location}>
      <Navigation />
    </Router>,
  );

  const goBackButton = screen.queryByAltText('Go Back');
  expect(goBackButton).toBeNull();
});

test('renders the title correctly', () => {
  render(
    <Router>
      <Navigation />
    </Router>,
  );

  const title = screen.getByText('Air Pollution Stats');
  expect(title).toBeInTheDocument();
});

test('renders the menu icon', () => {
  render(
    <Router>
      <Navigation />
    </Router>,
  );

  const menuIcon = screen.getByAltText('Menu');
  expect(menuIcon).toBeInTheDocument();
});
