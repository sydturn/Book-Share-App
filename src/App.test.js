import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

//We're going to get some unit tests up in here! 
//Also, This bad boy is gunna fail..but I like him so I'm going to keep him and see what Git does about it!
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
