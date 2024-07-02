import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useEffect } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface Data {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

const data: Data = {
  labels: [],
  datasets: [
    {
      label: '# of Counts',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ]
    }
  ]
};

interface TopKeyWord {
  keyword: string;
  count: number;
}

interface TopKeyWordChartProps {
  activeTab: string;
  topKeywords: TopKeyWord[];
  onClick: (word: string) => void;
}

const TopKeyWordChart = ({
  activeTab,
  topKeywords,
  onClick
}: TopKeyWordChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value: number, ctx: any) => {
          return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value + '회';
        },
        font: {
          weight: 'bold' as const,
          size: 12
        },
        anchor: 'center' as const,
        align: 'center' as const,
        offset: 0,
        rotation: 0
      }
    },
    onClick: (e: any, item: any) => {
      if (item.length === 0) return;
      const index = item[0].index;
      const keyword = data.labels[index];
      onClick(keyword);
    }
  };

  const splitArrayByKey = (data: TopKeyWord[]) => {
    const keywords: string[] = [];
    const counts: number[] = [];

    data.forEach(item => {
      keywords.push(item.keyword);
      counts.push(item.count);
    });

    return { keywords, counts };
  };

  useEffect(() => {
    const { keywords, counts } = splitArrayByKey(topKeywords);
    data.labels = keywords;
    data.datasets.map(dataset => {
      dataset.data = counts;
    });
  }, [activeTab]);

  return (
    <>
      <Doughnut data={data} options={options} />
    </>
  );
};

export default TopKeyWordChart;
