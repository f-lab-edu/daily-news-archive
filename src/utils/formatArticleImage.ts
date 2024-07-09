import { NewsData } from '@/components/Tabs';

const formatArticleImage = (article: NewsData): NewsData => {
  const { urlToImage, ...rest } = article;

  if (!urlToImage) return article;
  if (urlToImage.startsWith('http') || urlToImage.startsWith('https')) {
    return article;
  }
  return { ...rest, urlToImage: null };
};

export default formatArticleImage;
