import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

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
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ]
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart'
    }
  }
};

interface TopKeyWord {
  keyword: string;
  count: number;
}

interface TopKeyWordChartProps {
  activeTab: string;
  topKeywords: TopKeyWord[];
}

const TopKeyWordChart = ({ activeTab, topKeywords }: TopKeyWordChartProps) => {
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
