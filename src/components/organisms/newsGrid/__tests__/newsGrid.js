import { render, screen } from '@testing-library/react';
import NewsGrid from '../newsGrid';
import '@testing-library/jest-dom';

const mockSetSelectedNews = jest.fn();

const mockNews = [
  { id: '1', title: 'News 1' },
  { id: '2', title: 'News 2' },
  { id: '3', title: 'News 3' },
  { id: '4', title: 'News 4' }
];

describe('NewsGrid', () => {
  it('renders the correct number of NewsCard components when there is news', () => {
    render(
      <NewsGrid
        news={mockNews}
        loading={false}
        error={null}
        setSelectedNews={mockSetSelectedNews}
      />
    );

    expect(screen.getAllByTestId('news-card')).toHaveLength(mockNews.length);
  });

  it('renders loaders when loading is true', () => {
    render(
      <NewsGrid news={[]} loading={true} error={null} setSelectedNews={mockSetSelectedNews} />
    );

    // Check if the correct number of loaders are rendered
    expect(screen.getAllByTestId('news-card-loader')).toHaveLength(4);
  });

  it('shows an error message when there is an error', () => {
    render(
      <NewsGrid
        news={[]}
        loading={false}
        error="An error occurred"
        setSelectedNews={mockSetSelectedNews}
      />
    );

    expect(screen.getByText('An error occurred. Please try again later.')).toBeInTheDocument();
  });
});
