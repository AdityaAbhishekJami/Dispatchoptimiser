import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { kpiAPI } from '../services/api';
import { formatPercentage, formatNumber, formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, Truck, Target, DollarSign, AlertCircle, Users, Package, Download } from 'lucide-react';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import DriverLeaderboard from '../components/dashboard/DriverLeaderboard';
import FleetUtilization from '../components/dashboard/FleetUtilization';

export default function ManagerDashboard() {
  const { kpis, fetchKPIs } = useStore();
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  
  useEffect(() => {
    fetchKPIs();
    
    // Fetch historical data
    kpiAPI.getHistorical(30).then(setHistoricalData);
  }, [fetchKPIs]);
  
  const handleExportAudit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/audit-log/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dispatch_audit_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export audit data:', error);
      alert('Failed to export audit data. Please try again.');
    }
  };
  
  if (!kpis) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }
  
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Dashboard</h2>
            <p className="text-gray-600">Real-time insights and analytics</p>
          </div>
          <button
            onClick={handleExportAudit}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Audit Data</span>
          </button>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard
            icon={<Target className="w-6 h-6" />}
            label="On-Time Delivery"
            value={formatPercentage(kpis.onTimeDeliveryRate)}
            change={+2.3}
            color="green"
          />
          <KPICard
            icon={<Truck className="w-6 h-6" />}
            label="Fleet Utilization"
            value={formatPercentage(kpis.fleetUtilizationRate)}
            change={+5.1}
            color="blue"
          />
          <KPICard
            icon={<DollarSign className="w-6 h-6" />}
            label="Cost Per Mile"
            value={formatCurrency(kpis.costPerMile)}
            change={-3.2}
            color="purple"
          />
          <KPICard
            icon={<Package className="w-6 h-6" />}
            label="Loads Dispatched"
            value={kpis.totalLoadsDispatched.toString()}
            change={+12.5}
            color="indigo"
          />
        </div>
        
        {/* AI vs Baseline Comparison */}
        {kpis.baselineComparison && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Optimization Impact</h3>
                <p className="text-sm text-gray-600">vs {kpis.baselineComparison.method}</p>
              </div>
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                AI Optimized
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  +{kpis.baselineComparison.improvements.onTimeDeliveryRate}%
                </div>
                <div className="text-xs text-gray-600 mt-1">On-Time Delivery</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  -{kpis.baselineComparison.improvements.averageDeadheadMiles}%
                </div>
                <div className="text-xs text-gray-600 mt-1">Deadhead Miles</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  -{kpis.baselineComparison.improvements.costPerMile}%
                </div>
                <div className="text-xs text-gray-600 mt-1">Cost Per Mile</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">
                  +{kpis.baselineComparison.improvements.fleetUtilizationRate}%
                </div>
                <div className="text-xs text-gray-600 mt-1">Fleet Utilization</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Secondary Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            label="Average Deadhead Miles"
            value={formatNumber(kpis.averageDeadheadMiles)}
            unit="miles"
            icon={<TrendingDown className="w-5 h-5 text-green-600" />}
          />
          <MetricCard
            label="Assignment Accuracy"
            value={formatPercentage(kpis.assignmentAccuracy)}
            unit="AI vs Manual"
            icon={<Target className="w-5 h-5 text-blue-600" />}
          />
          <MetricCard
            label="SLA Breaches"
            value={kpis.slaBreaches.toString()}
            unit="this month"
            icon={<AlertCircle className="w-5 h-5 text-red-600" />}
            alert={kpis.slaBreaches > 20}
          />
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          <PerformanceChart data={historicalData} />
          <FleetUtilization />
        </div>
        
        {/* Driver Leaderboard */}
        <DriverLeaderboard />
      </div>
    </div>
  );
}

interface KPICardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: number;
  color: 'green' | 'blue' | 'purple' | 'indigo';
}

function KPICard({ icon, label, value, change, color }: KPICardProps) {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500'
  };
  
  const isPositive = change > 0;
  
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]} text-white`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  alert?: boolean;
}

function MetricCard({ label, value, unit, icon, alert }: MetricCardProps) {
  return (
    <div className={`card p-4 ${alert ? 'border-red-300 bg-red-50' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-600">{label}</div>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{unit}</div>
    </div>
  );
}

