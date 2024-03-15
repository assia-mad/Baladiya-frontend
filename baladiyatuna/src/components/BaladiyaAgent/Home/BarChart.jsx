import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { useTranslation } from 'react-i18next';
  import apiInstance from '../../../../API';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


  

const BarChart = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: t('Nombre des utilisateurs'),
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await apiInstance.get('stats_users/');
      const data = response;
      setChartData({
        ...chartData,
        labels: data.users_by_role.map(item => item.role),
        datasets: [{
          ...chartData.datasets[0],
          data: data.users_by_role.map(item => item.total)
        }]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <Bar data={chartData} />;
};

export default BarChart;
