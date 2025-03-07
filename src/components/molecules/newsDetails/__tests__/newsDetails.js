import { render, screen } from '@testing-library/react';
import NewsDetails from '../newsDetails';
import '@testing-library/jest-dom';

const mockNews = {
  title: 'Test News Article',
  published_date: '2025-03-06',
  abstract: 'This is an abstract of the news article.',
  media: [
    {
      'media-metadata': [
        { url: 'https://example.com/small.jpg' },
        { url: 'https://example.com/medium.jpg' },
        { url: 'https://example.com/large.jpg' }
      ],
      caption: 'An example caption for the image.'
    }
  ]
};

const mockNewsNoImage = {
  title: 'Test News Without Image',
  published_date: '2025-03-06',
  abstract: 'This article has no image.',
  media: []
};

describe('NewsDetails', () => {
  it('renders news details correctly when news is provided', () => {
    render(<NewsDetails {...mockNews} />);

    expect(screen.getByText('Test News Article')).toBeInTheDocument();
    expect(screen.getByText('2025-03-06')).toBeInTheDocument();
    expect(screen.getByText('This is an abstract of the news article.')).toBeInTheDocument();
    expect(
      screen.getByAltText("Image for the news article titled 'Test News Article'")
    ).toBeInTheDocument();
    expect(screen.getByText('An example caption for the image.')).toBeInTheDocument();
  });

  it('renders placeholder image when there is no image', () => {
    render(<NewsDetails {...mockNewsNoImage} />);

    const img = screen.getByAltText("Image for the news article titled 'Test News Without Image'");
    expect(img).toHaveAttribute('src', 'svg/not-available.svg');
  });

  it('displays fallback message for missing abstract', () => {
    const newsWithoutAbstract = { ...mockNews, abstract: undefined };
    render(<NewsDetails {...newsWithoutAbstract} />);

    expect(screen.getByText('No summary available for this article.')).toBeInTheDocument();
  });
});
