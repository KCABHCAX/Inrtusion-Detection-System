import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import FlowAnalysisPage from './pages/FlowAnalysisPage';
import ModelMetricsPage from './pages/ModelMetricsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans text-text">
        {/* Navigation placeholder */}
        <nav className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="font-bold text-xl text-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
            NIDS AI
          </div>
          <div className="flex gap-6 text-sm font-medium text-textMuted">
            <a href="/" className="hover:text-primary transit">Upload</a>
            <a href="/metrics" className="hover:text-primary transit">Model Metrics</a>
          </div>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analysis" element={<FlowAnalysisPage />} />
            <Route path="/metrics" element={<ModelMetricsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
