import Tabs, { NewsData } from '@/components/Tabs';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery
} from '@tanstack/react-query';
import { useState } from 'react';

const fetchNews = async (category: string) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&pageSize=100&apiKey=5369507a287b4e68b8f709bf96346024`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => fetchNews('business')
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default function Home({ dehydratedState }: { dehydratedState: any }) {
  const [activeTab, setActiveTab] = useState<string>('business');

  const { data, error, isLoading } = useQuery({
    queryKey: ['getNews', activeTab],
    queryFn: () => fetchNews(activeTab)
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

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <main className="p-5">
      <h1 className="text-center text-lg fonft-bold pb-5">
        Daily News Archive
      </h1>

      <HydrationBoundary state={dehydratedState}>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          newsList={formatArticleImage()}
        />
      </HydrationBoundary>
    </main>
  );
}
