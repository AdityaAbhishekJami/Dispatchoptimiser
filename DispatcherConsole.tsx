import { useState } from 'react';
import { useStore } from '../store/useStore';
import LoadsList from '../components/dispatcher/LoadsList';
import RecommendationPanel from '../components/dispatcher/RecommendationPanel';
import MapView from '../components/dispatcher/MapView';
import ActivityFeed from '../components/dispatcher/ActivityFeed';
import OptimizationModal from '../components/dispatcher/OptimizationModal';
import { Sparkles } from 'lucide-react';

export default function DispatcherConsole() {
  const [showOptimizationModal, setShowOptimizationModal] = useState(false);
  const { selectedLoadId, isOptimizing, runOptimization } = useStore();
  
  const handleAutoOptimize = async () => {
    await runOptimization();
    setShowOptimizationModal(true);
  };
  
  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-900">Dispatch Console</h2>
            <div className="text-sm text-gray-500">
              Manage load assignments and optimize routes
            </div>
          </div>
          <button
            onClick={handleAutoOptimize}
            disabled={isOptimizing}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isOptimizing ? 'Optimizing...' : 'Auto-Optimize'}</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden grid grid-cols-12 gap-0">
        {/* Left Panel - Loads List */}
        <div className="col-span-3 border-r border-gray-200 overflow-hidden">
          <LoadsList />
        </div>
        
        {/* Center Panel - Map View */}
        <div className="col-span-6 bg-gray-100 overflow-hidden">
          <MapView />
        </div>
        
        {/* Right Panel - Recommendations or Activity */}
        <div className="col-span-3 border-l border-gray-200 overflow-hidden">
          {selectedLoadId ? (
            <RecommendationPanel />
          ) : (
            <ActivityFeed />
          )}
        </div>
      </div>
      
      {/* Optimization Modal */}
      {showOptimizationModal && (
        <OptimizationModal onClose={() => setShowOptimizationModal(false)} />
      )}
    </div>
  );
}

