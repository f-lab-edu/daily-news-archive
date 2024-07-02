import Tabs, { NewsData } from '@/components/Tabs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import extractTopKeywords from '@/utils/extractTopKeywords';
import Tag from '@/components/Tag';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('business');

  const fetchNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=kr&category=${activeTab}&pageSize=100&apiKey=5369507a287b4e68b8f709bf96346024`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['getNews', activeTab],
    queryFn: fetchNews
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const topKeywords = extractTopKeywords(data.articles);
  topKeywords.forEach(({ keyword, count }) => {
    console.log(`${keyword}: ${count}회`);
  });

  const formatArticleImage = () => {
    return data.articles.map((article: NewsData) => {
      if (!article.urlToImage) return article;

      if (
        article.urlToImage?.startsWith('http') ||
        article.urlToImage?.startsWith('https')
      ) {
        return article;
      }

      return { ...article, urlToImage: null };
    });
  };

  return (
    <main className="p-5">
      <h1 className="text-center text-lg fonft-bold pb-5">
        Daily News Archive
      </h1>

      <div className="flex gap-2">
        {topKeywords.map(obj => (
          <Tag
            key={obj.keyword}
            content={obj.keyword}
            style="text-[#45CDCD] bg-[#EBFBF6] rounded-md w-max"
          />
        ))}
      </div>

      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        newsList={formatArticleImage()}
      />
    </main>
  );
}
