import { render, screen, fireEvent } from '@testing-library/react';
import NewsCard from '../newsCard'; // Ensure the correct import path
import '@testing-library/jest-dom';

const mockSetSelectedNews = jest.fn();

const mockNews = {
  id: '1',
  title: 'Test News Title',
  media: [
    {
      'media-metadata': [
        { url: 'https://example.com/small.jpg' },
        { url: 'https://example.com/medium.jpg' },
        { url: 'https://example.com/large.jpg' }
      ]
    }
  ]
};

const mockNewsWithNoImage = {
  id: '2',
  title: 'Test News Without Image',
  media: []
};

describe('NewsCard', () => {
  it('renders the news title and image correctly', () => {
    render(<NewsCard news={mockNews} setSelectedNews={mockSetSelectedNews} />);

    // Check if title is rendered
    expect(screen.getByText('Test News Title')).toBeInTheDocument();

    // Check if image is rendered with correct src
    const img = screen.getByAltText('Image related to Test News Title');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/large.jpg');
  });

  it('triggers setSelectedNews when the card is clicked', () => {
    render(<NewsCard news={mockNews} setSelectedNews={mockSetSelectedNews} />);

    const card = screen.getByTestId('news-card');
    fireEvent.click(card);

    expect(mockSetSelectedNews).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedNews).toHaveBeenCalledWith(mockNews);
  });

  it('uses a placeholder image when no valid image is provided', () => {
    render(<NewsCard news={mockNewsWithNoImage} setSelectedNews={mockSetSelectedNews} />);

    // Check if placeholder image is used
    const img = screen.getByAltText('Image related to Test News Without Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'svg/not-available.svg');
  });

  it('renders the alt text correctly', () => {
    render(<NewsCard news={mockNews} setSelectedNews={mockSetSelectedNews} />);

    const img = screen.getByAltText('Image related to Test News Title');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', 'Image related to Test News Title');
  });
});
