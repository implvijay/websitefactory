import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ProjectEditor } from './pages/ProjectEditor';
import { Preview } from './pages/Preview';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:projectId" element={<ProjectEditor />} />
        <Route path="/preview/:projectId" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}
