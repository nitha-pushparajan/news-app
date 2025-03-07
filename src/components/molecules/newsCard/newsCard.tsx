import { FC } from 'react';
import { NewsCardProps } from './newsCard.types';

const placeholder = 'svg/not-available.svg';

const NewsCard: FC<NewsCardProps> = ({ news, setSelectedNews }) => {
  const onNewsSelection = () => {
    setSelectedNews(news);
  };

  const imageUrl = news?.media?.[0]?.['media-metadata']?.[2]?.url || placeholder;
  const altText = `Image related to ${news?.title || 'News item'}`;

  return (
    <div
      onClick={onNewsSelection}
      key={news.id}
      data-testid="news-card"
      className="group relative bg-white p-5 rounded-[5px] cursor-pointer h-full flex flex-col"
    >
      <div className="relative w-full pb-[70%]">
        <img alt={altText} src={imageUrl} className="absolute w-full h-full rounded-lg" />
      </div>
      <div className="mb-[15px]">
        <div className="text-[18px] leading-[26px] text-[#747272]">
          <h2>{news.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
