import Tabs, { NewsData } from '@/components/Tabs';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  useQuery
} from '@tanstack/react-query';
import { useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const fetchNews = async (category: string): Promise<NewsData[]> => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&pageSize=100&apiKey=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.articles.map(formatArticle);
};

const formatArticle = (article: NewsData): NewsData => {
  if (!article.urlToImage) return article;
  if (
    article.urlToImage.startsWith('http') ||
    article.urlToImage.startsWith('https')
  ) {
    return article;
  }
  return { ...article, urlToImage: null };
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['news', 'business'],
    queryFn: () => fetchNews('business')
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

interface HomeProps {
  readonly dehydratedState: DehydratedState;
}

export default function Home({ dehydratedState }: HomeProps) {
  const [activeTab, setActiveTab] = useState<string>('business');

  const { data, error, isLoading } = useQuery({
    queryKey: ['news', activeTab],
    queryFn: () => fetchNews(activeTab)
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;

  return (
    <main className="p-5">
      <h1 className="text-center text-lg font-bold pb-5">Daily News Archive</h1>

      <HydrationBoundary state={dehydratedState}>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          newsList={data || []}
        />
      </HydrationBoundary>
    </main>
  );
}
