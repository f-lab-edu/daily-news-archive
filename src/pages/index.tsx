import Skeleton from '@/components/Skeleton';
import Tabs from '@/components/Tabs';
import { getNews } from '@/lib/newsApi';
import {
  dehydrate,
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  useQuery
} from '@tanstack/react-query';
import { useState } from 'react';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['news', 'business'],
    queryFn: () => getNews('business')
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
    queryFn: () => getNews(activeTab)
  });

  if (isLoading) return <Skeleton />;
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
