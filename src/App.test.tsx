import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders dynamic content', async () => {
  render(<App />);
  const dynamicElement = await waitFor(() => screen.getByText(/Day/i));
  expect(dynamicElement).toBeInTheDocument();
});