import { NewsProps } from 'src/components/molecules/newsCard/newsCard.types';

export interface NewsGridProps {
  news: NewsProps[];
  setSelectedNews: (news: NewsProps) => void;
  loading: boolean;
  error: any;
  setOpen: (open: boolean) => void;
}
