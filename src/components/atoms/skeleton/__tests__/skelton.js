import { render, screen } from '@testing-library/react';
import Skeleton from '../skeleton';

test('it renders the correct skeleton variant for button', () => {
  render(<Skeleton variant="button" />);
  const buttonSkeleton = screen.getByRole('presentation');
  expect(buttonSkeleton).toHaveClass('h-[50px] w-[120px]');
});

test('it renders a full-width skeleton when fullWidth is true', () => {
  render(<Skeleton variant="button" fullWidth />);
  const buttonSkeleton = screen.getByRole('presentation');
  expect(buttonSkeleton).toHaveClass('!w-full');
});
