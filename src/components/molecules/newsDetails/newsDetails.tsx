import { FC } from 'react';
import { NewsProps } from 'src/components/molecules/newsCard/newsCard.types';

const placeholder = 'svg/not-available.svg';

const NewsDetails: FC<NewsProps> = ({ ...news }) => {
  // Fallback values and improved alt text
  const imageUrl = news?.media?.[0]?.['media-metadata']?.[2]?.url || placeholder;
  const altText = `Image for the news article titled '${news?.title || 'News item'}'`;

  const publishedDate = news?.published_date || 'Date not available';
  const abstract = news?.abstract || 'No summary available for this article.';
  const caption = news?.media?.[0]?.caption || 'No caption available';

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-5">
          {news?.title}
        </h1>
        <p className="text-base leading-[24px] text-copy line-all body1 text-right pb-[22px]">
          <span className="text-copy-light">Published Date: </span>
          {publishedDate}
        </p>
      </div>

      <div className="relative pb-[70%]">
        <img
          src={imageUrl}
          alt={altText}
          className="absolute w-full h-full rounded-lg"
          onError={(e) => (e.currentTarget.src = placeholder)} // Handle image load error
        />
      </div>

      <p className="font-small text-gray-500 hover:text-gray-600 text-left">{caption}</p>

      <div className="py-10">
        <div>
          <div className="space-y-6">
            <p className="text-xl text-gray-900">{abstract}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
