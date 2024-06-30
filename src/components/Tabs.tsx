import TopKeyWordChart from '@/components/TopKeyWordChart';
import Tab from './Tab';
import TabContent from './TabContent';
import extractTopKeywords from '@/utils/extractTopKeywords';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  newsList: NewsData[];
}

export interface NewsData {
  source: {
    id: null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

const TABS: { label: string }[] = [
  { label: 'business' },
  { label: 'entertainment' },
  { label: 'health' },
  { label: 'science' },
  { label: 'sports' },
  { label: 'technology' }
];

const Tabs = ({ activeTab, setActiveTab, newsList }: TabsProps) => {
  const topKeywords = extractTopKeywords(newsList);

  return (
    <>
      <section className="py-4 flex justify-between overflow-auto">
        {TABS.map(tab => (
          <Tab
            key={tab.label}
            label={tab.label}
            onClick={() => setActiveTab(tab.label)}
            isActive={tab.label === activeTab}
          />
        ))}
      </section>
      <section className="py-5">
        <TopKeyWordChart activeTab={activeTab} topKeywords={topKeywords} />
      </section>
      <section className="tab-contents none active:block">
        {newsList?.map((news: NewsData) => {
          return (
            <button key={news.title} onClick={() => window.open(news.url)}>
              <TabContent content={news} />
            </button>
          );
        })}
      </section>
    </>
  );
};

export default Tabs;
