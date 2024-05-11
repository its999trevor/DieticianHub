import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts';
import logs from '../../api/services/dailylog';

const Callog = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    try {
      const userData = await logs.getData();
      const logData = userData[0].logs;

      // Prepare data for LineChart
      const chartDataArray = logData.map(log => ({
        date: new Date(log.date),
        totalCalories: log.mealeaten.totalCalories,
      }));

      setChartData(chartDataArray);
    } catch (error) {
      console.error('Error fetching log data:', error);
    }
  }

  console.log('ChartData:', chartData);

  return (
    <div className='container prog'>
    <div className='title' >Your Progress chart</div>
    
       <LineChart
      xAxis={[
        {
          id: 'date',
          data: chartData.map(data => data.date),
          scaleType: 'time',
        },
      ]}
      series={[
        {
          id: 'progress',
          label: 'Your progress',
          data: chartData.map(data => data.totalCalories),
          stack: 'total',
          area: true,
          showMark: false,
        }
      ]}
      width={600}
      height={400}
      margin={{ left: 70 }}
    />
    
    </div>
  );
}

export default Callog;
