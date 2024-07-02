import Tab from './Tab';
import TabContent from './TabContent';

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

const TABS: { label: string; content: string }[] = [
  { label: 'business', content: 'This is the content of business' },
  { label: 'entertainment', content: 'This is the content of entertainment' },
  { label: 'health', content: 'This is the content of health' },
  { label: 'science', content: 'This is the content of science' },
  { label: 'sports', content: 'This is the content of sports' },
  { label: 'technology', content: 'This is the content of technology' }
];

const Tabs = ({ activeTab, setActiveTab, newsList }: TabsProps) => {
  return (
    <>
      <div className="pt-2 pb-6">
        {TABS.map(tab => (
          <Tab
            key={tab.label}
            label={tab.label}
            onClick={() => setActiveTab(tab.label)}
            isActive={tab.label === activeTab}
          />
        ))}
      </div>
      <div className="tab-contents none active:block">
        {newsList?.map((news: NewsData) => {
          return (
            <button key={news.title} onClick={() => window.open(news.url)}>
              <TabContent content={news} />
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
