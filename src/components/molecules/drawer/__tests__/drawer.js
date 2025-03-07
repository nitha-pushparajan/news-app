import { render, screen, fireEvent } from '@testing-library/react';
import NewsCardDrawer from '../drawer'; // Adjust path as necessary
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher

const mockProps = {
  open: true,
  setOpen: jest.fn(),
  selectedNews: {
    title: 'Sample News',
    content: 'This is a detailed news content',
    author: 'John Doe',
    date: '2025-03-06'
  }
};

describe('NewsCardDrawer', () => {
  it('should render the drawer when the open prop is true', () => {
    render(<NewsCardDrawer {...mockProps} />);

    // Check if the drawer is in the document
    const drawerElement = screen.getByTestId('drawer');
    expect(drawerElement).toBeInTheDocument();

    // Check if the NewsDetails component is rendered
    const newsTitle = screen.getByText(mockProps.selectedNews.title);
    expect(newsTitle).toBeInTheDocument();
  });

  it('should close the drawer when the overlay is clicked', () => {
    render(<NewsCardDrawer {...mockProps} />);

    // Check if the overlay is rendered
    const overlayElement = screen.getByTestId('overlay');
    fireEvent.click(overlayElement); // Simulate a click on the overlay

    // Check if the setOpen function was called
    expect(mockProps.setOpen).toHaveBeenCalledWith(false);
  });

  it('should close the drawer when the close button is clicked', () => {
    render(<NewsCardDrawer {...mockProps} />);

    // Find the close button and simulate a click
    const closeButton = screen.getByTestId('drawer-close');
    fireEvent.click(closeButton);

    // Check if setOpen was called with false
    expect(mockProps.setOpen).toHaveBeenCalledWith(false);
  });

  it('should add "overflow-y-hidden" class to body when open is true', () => {
    render(<NewsCardDrawer {...mockProps} />);

    // Check if the class is added to the body
    expect(document.body.classList.contains('overflow-y-hidden')).toBe(true);
  });
});
