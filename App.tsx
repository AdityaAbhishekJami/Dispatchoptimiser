import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import DispatcherConsole from './pages/DispatcherConsole';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  const fetchAll = useStore(state => state.fetchAll);
  
  useEffect(() => {
    fetchAll();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dispatcher" replace />} />
          <Route path="dispatcher" element={<DispatcherConsole />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

