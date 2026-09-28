import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/layout';
import HomePage from './pages/HomePage';
import CompanyPage from './pages/CompanyPage';
import XRayPage from './pages/XRayPage';
import VSPage from './pages/VSPage';
import AnalystPage from './pages/AnalystPage';
import RedTeamPage from './pages/RedTeamPage';
import GraphPage from './pages/GraphPage';
import DiscoverPage from './pages/DiscoverPage';
import NetworkPage from './pages/NetworkPage';
import ThesisPage from './pages/ThesisPage';
import EcosystemPage from './pages/EcosystemPage';
import DominoPage from './pages/DominoPage';
import WatchlistPage from './pages/WatchlistPage';
import CompaniesPage from './pages/CompaniesPage';
import ScenarioLabPage from './pages/ScenarioLabPage';

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/company/:id" element={<CompanyPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/xray/:id" element={<XRayPage />} />
          <Route path="/xray" element={<XRayPage />} />
          <Route path="/vs" element={<VSPage />} />
          <Route path="/analyst" element={<AnalystPage />} />
          <Route path="/redteam" element={<RedTeamPage />} />
          <Route path="/graph/:id" element={<GraphPage />} />
          <Route path="/graph" element={<GraphPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/thesis" element={<ThesisPage />} />
          <Route path="/ecosystem" element={<EcosystemPage />} />
          <Route path="/domino" element={<DominoPage />} />
          <Route path="/radar" element={<WatchlistPage />} />
          <Route path="/scenario/:id" element={<ScenarioLabPage />} />
          <Route path="/scenario" element={<ScenarioLabPage />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}
