import { FC } from 'react';
import { NewsCard } from '../../molecules/newsCard';
import { NewsGridProps } from './newsGrid.types';
import NewsCardLoader from 'src/components/molecules/loader/newsCardLoader';

const NewsGrid: FC<NewsGridProps> = ({ news = [], setSelectedNews, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(4)].map((_, n) => (
          <NewsCardLoader key={`key-${n}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-testid="news-error"
        className="w-full h-full absolute flex justify-center items-center text-[#222]"
      >
        An error occurred. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {news?.map((item) => (
        <NewsCard news={item} key={item.id} setSelectedNews={setSelectedNews} />
      ))}
    </div>
  );
};

export default NewsGrid;
