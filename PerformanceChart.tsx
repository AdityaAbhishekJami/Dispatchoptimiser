import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface PerformanceChartProps {
  data: Array<any>;
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const chartData = data.map(item => ({
    date: format(new Date(item.date), 'MMM dd'),
    onTime: item.onTimeDeliveryRate,
    utilization: item.fleetUtilizationRate,
    deadhead: item.averageDeadheadMiles
  }));
  
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="onTime" 
            stroke="#10b981" 
            strokeWidth={2}
            name="On-Time Rate (%)"
            dot={{ fill: '#10b981', r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="utilization" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Fleet Utilization (%)"
            dot={{ fill: '#3b82f6', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

