import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function FleetUtilization() {
  // Mock hourly utilization data
  const data = [
    { hour: '00:00', utilization: 45 },
    { hour: '04:00', utilization: 38 },
    { hour: '08:00', utilization: 72 },
    { hour: '12:00', utilization: 88 },
    { hour: '16:00', utilization: 95 },
    { hour: '20:00', utilization: 67 }
  ];
  
  const getColor = (value: number) => {
    if (value >= 85) return '#10b981';
    if (value >= 70) return '#3b82f6';
    if (value >= 50) return '#f59e0b';
    return '#ef4444';
  };
  
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Utilization by Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="hour" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Utilization (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number) => [`${value}%`, 'Utilization']}
          />
          <Bar dataKey="utilization" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.utilization)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <span className="text-gray-600">High (85%+)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-blue-500"></div>
          <span className="text-gray-600">Good (70-84%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-yellow-500"></div>
          <span className="text-gray-600">Fair (50-69%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span className="text-gray-600">Low (&lt;50%)</span>
        </div>
      </div>
    </div>
  );
}

