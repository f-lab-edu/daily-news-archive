'use client';

import { NewsData } from '@/components/Tabs';
import Image from 'next/image';

interface TabContentProps {
  content: NewsData;
}

const TabContent = ({ content }: TabContentProps) => {
  return (
    <article
      key={content.title}
      className="flex justify-between items-center gap-2 border-b rounded-sm py-4"
    >
      <section>
        <h2 className="text-sm">{content.title}</h2>
      </section>
      {content.urlToImage && (
        <Image
          src={content.urlToImage}
          width={200}
          height={200}
          alt={content.title}
          className="w-24 h-auto object-cover"
        />
      )}
    </article>
  );
};

export default TabContent;
