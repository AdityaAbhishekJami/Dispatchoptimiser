import { useStore } from '../../store/useStore';
import { formatNumber, formatPercentage } from '../../utils/helpers';
import { Trophy, Star, TrendingUp } from 'lucide-react';

export default function DriverLeaderboard() {
  const { drivers } = useStore();
  
  // Sort drivers by rating and on-time rate
  const topDrivers = [...drivers]
    .sort((a, b) => {
      const scoreA = a.rating * 0.5 + a.onTimeDeliveryRate * 0.5;
      const scoreB = b.rating * 0.5 + b.onTimeDeliveryRate * 0.5;
      return scoreB - scoreA;
    })
    .slice(0, 10);
  
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
        <Trophy className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">On-Time %</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Miles</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {topDrivers.map((driver, index) => (
              <tr key={driver.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    {index < 3 ? (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        'bg-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                    ) : (
                      <div className="w-6 h-6 flex items-center justify-center text-gray-500 text-sm">
                        {index + 1}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                  <div className="text-xs text-gray-500">{driver.licenseNumber}</div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{driver.rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-900">{formatPercentage(driver.onTimeDeliveryRate)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm text-gray-900">{formatNumber(driver.totalMilesDriven)}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    driver.status === 'available' || driver.status === 'on_duty' ? 'bg-green-100 text-green-800' :
                    driver.status === 'assigned' || driver.status === 'driving' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {driver.status.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

