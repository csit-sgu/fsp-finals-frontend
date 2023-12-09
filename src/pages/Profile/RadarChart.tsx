import { Radar } from 'react-chartjs-2';
import { useRef } from 'react';
import 'chart.js/auto';

export const RadarChart = ({ chartData }: any) => {
  const ref = useRef();

  return (
    <div className="chart-container" style={{ marginTop: '100px', marginBottom: '100px' }}>
      <Radar
        ref={ref}
        data={chartData}
        height={'400px'}
        options={{
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
    </div>
  );
};
