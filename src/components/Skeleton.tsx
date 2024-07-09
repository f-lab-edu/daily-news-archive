import React from 'react';

const SkeletonTab = () => (
  <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
);

const SkeletonTopKeyWordChart = () => (
  <div className="h-80 w-80 bg-gray-200 rounded-full animate-pulse"></div>
);

const SkeletonTabContent = () => (
  <div className="flex justify-between items-center py-4 border-b border-gray-200 animate-pulse gap-2">
    <div className="w-full h-20 bg-gray-200 rounded"></div>
    <div className="w-40 h-20 bg-gray-200 rounded"></div>
  </div>
);

const SkeletonTabs = () => {
  return (
    <>
      <section className="py-4 flex justify-between overflow-auto">
        <SkeletonTab />
      </section>
      <section className="py-5 flex justify-center max-w-96 m-auto">
        <SkeletonTopKeyWordChart />
      </section>
      <section className="tab-contents flex flex-col">
        {[...Array(5)].map((_, index) => (
          <SkeletonTabContent key={index} />
        ))}
      </section>
    </>
  );
};

const Skeleton = () => {
  return (
    <main className="p-5">
      <h1 className="text-center text-lg font-bold pb-5">Daily News Archive</h1>
      <div className="animate-pulse">
        <SkeletonTabs />
      </div>
    </main>
  );
};

export default Skeleton;
