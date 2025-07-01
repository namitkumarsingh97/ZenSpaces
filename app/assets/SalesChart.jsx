import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { Square3Stack3DIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { BASE_URL } from '@/utils/apiClient';

export default function SalesChart() {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/api/dashboard-stats`)
      .then((response) => response.json())
      .then((data) => {
        const monthlyData = data.monthlyData;

        setCategories(monthlyData.map((item) => item.month));
        setChartData(monthlyData.map((item) => item.count));

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data.');
        setLoading(false);
      });
  }, []);

  const chartConfig = {
    type: 'bar',
    height: 420,
    series: [
      {
        name: 'Sales',
        data: chartData,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: '',
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#AF8C3E'],
      plotOptions: {
        bar: {
          columnWidth: '40%',
          borderRadius: 2,
        },
      },
      xaxis: {
        categories: categories,
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-[#AF8C3E] p-5 text-white">
          <FaMoneyBillTrendUp className="h-8 w-8" />
        </div>
        <div>
          <Typography className="text-xl font-medium text-black font-jost">
            Sales Chart
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
