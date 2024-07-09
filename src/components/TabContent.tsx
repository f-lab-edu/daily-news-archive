'use client';

import ImageWithFallback from '@/components/ImageWithFallback';
import { NewsData } from '@/components/Tabs';

interface TabContentProps {
  content: NewsData;
}

const TabContent = ({ content }: TabContentProps) => {
  return (
    <article className="flex justify-between items-center gap-2 border-t rounded-sm py-4">
      <section>
        <h2 className="text-sm text-left">{content.title}</h2>
      </section>
      {content.urlToImage && (
        <ImageWithFallback
          src={content.urlToImage}
          alt={content.title}
          fallbackSrc="/olaf.png"
          width={200}
          height={200}
          className="min-w-24 w-24 object-cover max-h-20"
        />
      )}
    </article>
  );
};

export default TabContent;
