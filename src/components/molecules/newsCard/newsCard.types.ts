type mediaType = {
  caption: string;
  'media-metadata': {
    url: string;
  }[];
};

export type NewsProps = {
  abstract: string;
  adx_keywords: string;
  asset_id: number;
  byline: string;
  id: number;
  published_date: string;
  source: string;
  title: string;
  type: string;
  updated: Date;
  media: mediaType[];
};

export interface NewsCardProps {
  news: NewsProps;
  setSelectedNews: (news: NewsProps) => void;
}
