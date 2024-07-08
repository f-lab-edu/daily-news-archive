import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface TopKeyWord {
  keyword: string;
  count: number;
}

interface TopKeyWordChartProps {
  topKeywords: TopKeyWord[];
  onClick: (word: string) => void;
}

const TopKeyWordChart = ({ topKeywords, onClick }: TopKeyWordChartProps) => {
  const { labels, datasets } = useMemo(() => {
    const keywords: string[] = [];
    const counts: number[] = [];

    topKeywords.forEach(item => {
      keywords.push(item.keyword);
      counts.push(item.count);
    });

    return {
      labels: keywords,
      datasets: [
        {
          label: '# of Counts',
          data: counts,
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
  }, [topKeywords]);

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
      const keyword = labels[index];
      onClick(keyword);
    }
  };

  return (
    <>
      <Doughnut data={{ labels, datasets }} options={options} />
    </>
  );
};

export default TopKeyWordChart;
